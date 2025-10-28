/**
 * Async Handler Middleware
 * Wraps async route handlers to catch errors and pass them to error handling middleware
 * This eliminates the need for try-catch blocks in every async controller
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
