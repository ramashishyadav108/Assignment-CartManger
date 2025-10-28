/**
 * Error Handler Middleware
 * Centralized error handling for the Express application
 * Catches all errors and sends appropriate response to client
 */

/**
 * 404 Not Found Handler
 * Catches requests to routes that don't exist
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * General Error Handler
 * Handles all errors passed through next(error)
 */
export const errorHandler = (err, req, res, next) => {
  // Use existing status code if available, otherwise use 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 404;
    message = `Resource not found with id: ${err.value}`;
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    // Include stack trace in development mode only
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};
