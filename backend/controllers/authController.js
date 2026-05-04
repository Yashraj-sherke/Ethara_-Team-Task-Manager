const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { asyncHandler, AppError, formatResponse } = require('../utils/helpers');

// @desc    Register user
// @route   POST /api/auth/signup
const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError('User already exists with this email', 400);
  }

  const user = await User.create({ name, email, password, role: role || 'member' });
  const token = generateToken(user._id);

  res.status(201).json(formatResponse({
    _id: user._id, name: user.name, email: user.email, role: user.role, token
  }, 'User registered successfully'));
});

// @desc    Login user
// @route   POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken(user._id);

  res.json(formatResponse({
    _id: user._id, name: user.name, email: user.email, role: user.role, token
  }, 'Login successful'));
});

// @desc    Get current user
// @route   GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(formatResponse(user));
});

module.exports = { signup, login, getMe };
