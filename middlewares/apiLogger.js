const logger = require('../utils/logger');

const apiLogger = (req, res, next) => {
    const startTime = process.hrtime();

    // Ensure we only attach listeners once
    const cleanup = () => {
        res.removeListener('finish', logResponse);
        res.removeListener('close', cleanup);
        res.removeListener('error', cleanup);
    };

    const logResponse = () => {
        try {
            const diff = process.hrtime(startTime);
            const durationInMs = (diff[0] * 1000) + (diff[1] / 1000000); // Convert to milliseconds

            const logData = {
                method: req.method,
                path: req.path,
                status: res.statusCode,
                duration: `${durationInMs.toFixed(2)}ms`,
                ip: req.ip || req.connection.remoteAddress,
                userAgent: req.get('User-Agent') || 'unknown'
            };

            if (res.statusCode >= 400) {
                logger.error('API Request Error', logData);
            } else {
                logger.info('API Request', logData);
            }
        } catch (err) {
            logger.error('Logging middleware error', { error: err.message });
        } finally {
            cleanup();
        }
    };

    // Attach event listeners
    res.on('finish', logResponse);
    res.on('close', cleanup);
    res.on('error', cleanup);

    next();
};

module.exports = apiLogger;