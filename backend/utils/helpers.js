class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const formatResponse = (data, message = 'Success') => ({
  success: true,
  message,
  data
});

module.exports = { AppError, asyncHandler, formatResponse };
