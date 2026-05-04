const Task = require('../models/Task');
const Project = require('../models/Project');
const { asyncHandler, AppError, formatResponse } = require('../utils/helpers');

// @desc    Get all tasks
// @route   GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const { status, dueDate, project } = req.query;
  let filter = {};

  if (status) filter.status = status;
  if (project) filter.project = project;

  if (dueDate === 'overdue') {
    filter.dueDate = { $lt: new Date() };
    filter.status = { $ne: 'completed' };
  } else if (dueDate === 'today') {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
    filter.dueDate = { $gte: today, $lt: tomorrow };
  } else if (dueDate === 'week') {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const weekLater = new Date(today); weekLater.setDate(weekLater.getDate() + 7);
    filter.dueDate = { $gte: today, $lt: weekLater };
  }

  if (req.user.role !== 'admin') {
    filter.$or = [{ assignedTo: req.user._id }, { createdBy: req.user._id }];
  }

  const tasks = await Task.find(filter)
    .populate('project', 'name')
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .sort('-createdAt');

  res.json(formatResponse(tasks));
});

// @desc    Get single task
// @route   GET /api/tasks/:id
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('project', 'name')
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');
  if (!task) throw new AppError('Task not found', 404);
  res.json(formatResponse(task));
});

// @desc    Create task
// @route   POST /api/tasks
const createTask = asyncHandler(async (req, res) => {
  const { title, description, project, assignedTo, priority, dueDate } = req.body;

  const projectDoc = await Project.findById(project);
  if (!projectDoc) throw new AppError('Project not found', 404);

  if (req.user.role !== 'admin' &&
    !projectDoc.owner.equals(req.user._id) &&
    !projectDoc.members.some(m => m.equals(req.user._id))) {
    throw new AppError('Not authorized to create tasks in this project', 403);
  }

  if (assignedTo) {
    if (!projectDoc.members.some(m => m.equals(assignedTo))) {
      throw new AppError('Assigned user is not a member of this project', 400);
    }
  }

  const task = await Task.create({
    title, description, project,
    assignedTo: assignedTo || null,
    createdBy: req.user._id,
    priority: priority || 'medium',
    dueDate: dueDate || null
  });

  const populated = await Task.findById(task._id)
    .populate('project', 'name')
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');

  res.status(201).json(formatResponse(populated, 'Task created successfully'));
});

// @desc    Update task
// @route   PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);
  if (!task) throw new AppError('Task not found', 404);

  // Members can only update status of tasks assigned to them
  if (req.user.role !== 'admin') {
    const isCreator = task.createdBy.equals(req.user._id);
    const isAssigned = task.assignedTo && task.assignedTo.equals(req.user._id);

    if (!isCreator && !isAssigned) {
      throw new AppError('Not authorized to update this task', 403);
    }

    if (isAssigned && !isCreator) {
      // Members assigned to task can only update status
      const allowedFields = ['status'];
      const updateFields = Object.keys(req.body);
      const isValid = updateFields.every(f => allowedFields.includes(f));
      if (!isValid) {
        throw new AppError('You can only update task status', 403);
      }
    }
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true
  })
    .populate('project', 'name')
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');

  res.json(formatResponse(task, 'Task updated successfully'));
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new AppError('Task not found', 404);

  if (req.user.role !== 'admin' && !task.createdBy.equals(req.user._id)) {
    throw new AppError('Not authorized to delete this task', 403);
  }

  await Task.findByIdAndDelete(req.params.id);
  res.json(formatResponse(null, 'Task deleted successfully'));
});

// @desc    Get tasks for a project
// @route   GET /api/projects/:id/tasks
const getProjectTasks = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new AppError('Project not found', 404);

  const tasks = await Task.find({ project: req.params.id })
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .sort('-createdAt');

  res.json(formatResponse(tasks));
});

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask, getProjectTasks };
