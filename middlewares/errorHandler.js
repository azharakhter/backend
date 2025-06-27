const logger = require('../utils/logger');

const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
};

const errorHandler = (err, req, res, next) => {
    console.log('error handle', err);
    // Determine status code
    const statusCode = err.status || (res.statusCode === 200 ? 500 : res.statusCode);

    // Prepare error response
    const errorResponse = {
        success: false,
        error: {
            message: err.message || 'Internal Server Error',
            status: statusCode,
            path: req.path,
            method: req.method,
            ...(err.details && { details: err.details }),
            ...(process.env.NODE_ENV === 'development' && {
                stack: err.stack,
                fullError: err
            })
        }
    };

    // Log the error
    logger.error(err.message, {
        status: statusCode,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
        path: req.path,
        method: req.method,
        ...(err.details && { details: err.details })
    });

    // Send response
    res.status(statusCode).json(errorResponse);
};

module.exports = {
    notFoundHandler,
    errorHandler
};