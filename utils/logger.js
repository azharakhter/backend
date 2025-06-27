const { createLogger, format, transports } = require('winston');
const config = require('../config');

const logger = createLogger({
    level: config.isProduction ? 'info' : 'debug',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(
                    ({ timestamp, level, message, stack }) =>
                        `${timestamp} [${level}]: ${message} ${stack || ''}`
                )
            )
        }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log' })
    ]
});

module.exports = logger;