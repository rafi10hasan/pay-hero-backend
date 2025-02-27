const createError = (message, statusCode) => ({
    message,
    statusCode,
    isOperational: true, // Indicates this is an operational (known) error
});
module.exports = {createError}