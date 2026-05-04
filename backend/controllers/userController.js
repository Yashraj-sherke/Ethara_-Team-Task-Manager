const User = require('../models/User');
const { asyncHandler, formatResponse } = require('../utils/helpers');

// @desc    Get all users (admin only)
// @route   GET /api/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-__v').sort('name');
  res.json(formatResponse(users));
});

module.exports = { getUsers };
