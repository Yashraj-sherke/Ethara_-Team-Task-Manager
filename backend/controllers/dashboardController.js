const Project = require('../models/Project');
const Task = require('../models/Task');
const { asyncHandler, formatResponse } = require('../utils/helpers');

// @desc    Get dashboard stats
// @route   GET /api/dashboard
const getDashboardStats = asyncHandler(async (req, res) => {
  let projectFilter = {};
  let taskFilter = {};

  if (req.user.role !== 'admin') {
    const userProjects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }]
    }).select('_id');
    const projectIds = userProjects.map(p => p._id);
    projectFilter = { _id: { $in: projectIds } };
    taskFilter = { project: { $in: projectIds } };
  }

  const totalProjects = await Project.countDocuments(projectFilter);
  const totalTasks = await Task.countDocuments(taskFilter);
  const completedTasks = await Task.countDocuments({ ...taskFilter, status: 'completed' });
  const pendingTasks = await Task.countDocuments({ ...taskFilter, status: { $in: ['todo', 'in-progress'] } });
  const overdueTasks = await Task.countDocuments({
    ...taskFilter,
    dueDate: { $lt: new Date() },
    status: { $ne: 'completed' }
  });
  const inProgressTasks = await Task.countDocuments({ ...taskFilter, status: 'in-progress' });

  // Recent tasks (last 10)
  const recentTasks = await Task.find(taskFilter)
    .populate('project', 'name')
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .sort('-updatedAt')
    .limit(10);

  // Task distribution by status
  const tasksByStatus = await Task.aggregate([
    { $match: taskFilter },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  res.json(formatResponse({
    stats: {
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      inProgressTasks
    },
    recentTasks,
    tasksByStatus
  }));
});

module.exports = { getDashboardStats };
