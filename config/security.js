const helmet = require('helmet');
const config = require('./index');

const securityMiddleware = [
    helmet(),
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https://api.nasa.gov'],
            connectSrc: ["'self'", 'https://api.nasa.gov']
        }
    }),
    helmet.referrerPolicy({ policy: 'same-origin' }),
    helmet.frameguard({ action: 'deny' }),
    helmet.hsts({
        maxAge: 63072000,
        includeSubDomains: true,
        preload: true
    }),
    helmet.noSniff(),
    helmet.xssFilter()
];

if (config.isProduction) {
    securityMiddleware.push(helmet.hidePoweredBy());
}

module.exports = securityMiddleware;