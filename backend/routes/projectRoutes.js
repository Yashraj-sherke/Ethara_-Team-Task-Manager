const express = require('express');
const router = express.Router();
const {
  getProjects, getProject, createProject, updateProject, deleteProject, addMember, removeMember
} = require('../controllers/projectController');
const { getProjectTasks } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

router.use(protect);

router.route('/')
  .get(getProjects)
  .post(roleCheck('admin'), createProject);

router.route('/:id')
  .get(getProject)
  .put(roleCheck('admin'), updateProject)
  .delete(roleCheck('admin'), deleteProject);

router.route('/:id/members')
  .post(roleCheck('admin'), addMember);

router.route('/:id/members/:userId')
  .delete(roleCheck('admin'), removeMember);

router.get('/:id/tasks', getProjectTasks);

module.exports = router;
