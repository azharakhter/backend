const rateLimit = require('express-rate-limit');
const config = require('./index');
const logger = require('../utils/logger');

const apiLimiter = rateLimit({
    windowMs: config.rateLimiting.windowMs,
    max: config.rateLimiting.max,
    handler: (req, res) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            error: 'Too many requests, please try again later'
        });
    },
    standardHeaders: true,
    legacyHeaders: false
});

const createRateLimiter = (windowMs, max) => {
    return rateLimit({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false
    });
};

module.exports = {
    apiLimiter,
    createRateLimiter
};