const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');
const { asyncHandler, AppError, formatResponse } = require('../utils/helpers');

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = asyncHandler(async (req, res) => {
  let query;
  if (req.user.role === 'admin') {
    query = Project.find();
  } else {
    query = Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }]
    });
  }

  const projects = await query
    .populate('owner', 'name email')
    .populate('members', 'name email role')
    .sort('-createdAt');

  const projectsWithCounts = await Promise.all(
    projects.map(async (project) => {
      const taskCounts = await Task.aggregate([
        { $match: { project: project._id } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      const counts = { total: 0, todo: 0, 'in-progress': 0, completed: 0 };
      taskCounts.forEach(tc => { counts[tc._id] = tc.count; counts.total += tc.count; });
      return { ...project.toObject(), taskCounts: counts };
    })
  );

  res.json(formatResponse(projectsWithCounts));
});

// @desc    Get single project
// @route   GET /api/projects/:id
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('owner', 'name email')
    .populate('members', 'name email role');

  if (!project) throw new AppError('Project not found', 404);

  if (req.user.role !== 'admin' &&
    !project.owner._id.equals(req.user._id) &&
    !project.members.some(m => m._id.equals(req.user._id))) {
    throw new AppError('Not authorized to view this project', 403);
  }

  const tasks = await Task.find({ project: project._id })
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .sort('-createdAt');

  res.json(formatResponse({ ...project.toObject(), tasks }));
});

// @desc    Create project
// @route   POST /api/projects
const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({
    name, description, owner: req.user._id, members: [req.user._id]
  });
  const populated = await Project.findById(project._id)
    .populate('owner', 'name email')
    .populate('members', 'name email role');
  res.status(201).json(formatResponse(populated, 'Project created successfully'));
});

// @desc    Update project
// @route   PUT /api/projects/:id
const updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);
  if (!project) throw new AppError('Project not found', 404);

  if (req.user.role !== 'admin' && !project.owner.equals(req.user._id)) {
    throw new AppError('Not authorized to update this project', 403);
  }

  const { name, description, status } = req.body;
  project = await Project.findByIdAndUpdate(
    req.params.id, { name, description, status },
    { new: true, runValidators: true }
  ).populate('owner', 'name email').populate('members', 'name email role');

  res.json(formatResponse(project, 'Project updated successfully'));
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new AppError('Project not found', 404);

  if (req.user.role !== 'admin' && !project.owner.equals(req.user._id)) {
    throw new AppError('Not authorized to delete this project', 403);
  }

  await Task.deleteMany({ project: project._id });
  await Project.findByIdAndDelete(req.params.id);
  res.json(formatResponse(null, 'Project deleted successfully'));
});

// @desc    Add member to project
// @route   POST /api/projects/:id/members
const addMember = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const project = await Project.findById(req.params.id);
  if (!project) throw new AppError('Project not found', 404);

  if (req.user.role !== 'admin' && !project.owner.equals(req.user._id)) {
    throw new AppError('Not authorized to add members', 403);
  }

  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);

  if (project.members.some(m => m.equals(userId))) {
    throw new AppError('User is already a member of this project', 400);
  }

  project.members.push(userId);
  await project.save();

  const updated = await Project.findById(project._id)
    .populate('owner', 'name email').populate('members', 'name email role');
  res.json(formatResponse(updated, 'Member added successfully'));
});

// @desc    Remove member from project
// @route   DELETE /api/projects/:id/members/:userId
const removeMember = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new AppError('Project not found', 404);

  if (req.user.role !== 'admin' && !project.owner.equals(req.user._id)) {
    throw new AppError('Not authorized to remove members', 403);
  }

  if (project.owner.equals(req.params.userId)) {
    throw new AppError('Cannot remove the project owner', 400);
  }

  project.members = project.members.filter(m => !m.equals(req.params.userId));
  await project.save();

  await Task.updateMany(
    { project: project._id, assignedTo: req.params.userId },
    { assignedTo: null }
  );

  const updated = await Project.findById(project._id)
    .populate('owner', 'name email').populate('members', 'name email role');
  res.json(formatResponse(updated, 'Member removed successfully'));
});

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject, addMember, removeMember };
