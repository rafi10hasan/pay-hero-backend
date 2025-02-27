const globalErrorHandler = (err, _req, res) => {
    const { statusCode = 500, message = 'Something went wrong', isOperational = false } = err;

    // Different behavior for production vs. development
    if (process.env.NODE_ENV === 'development') {
        // Development: Provide detailed error for debugging
        res.status(statusCode).json({
            status: statusCode < 500 ? 'fail' : 'error',
            message,
            stack: err.stack, // Include stack trace
            error: err, // Full error object for debugging
        });
    } else {
        // Production: Send minimal details to the client
        res.status(statusCode).json({
            status: statusCode < 500 ? 'fail' : 'error',
            message: isOperational ? message : 'Internal Server Error', // Avoid exposing system details
        });

        // Log all unexpected errors
        if (!isOperational) {
            console.error('Unexpected Error:', {
                message: err.message,
                stack: err.stack,
                error: err,
            });
        }
    }
};

module.exports = { globalErrorHandler };

