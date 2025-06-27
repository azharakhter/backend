const logger = require('../utils/logger');

const healthCheck = (req, res) => {
    logger.info('Health check endpoint called');
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
};

module.exports = {
    healthCheck
};