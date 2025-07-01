// config/index.js
const dotenv = require('dotenv');

// Load env vars before anything else
const envFound = dotenv.config();
if (envFound.error) {
    console.error('⚠️  Could not find .env file  ⚠️');
    process.exit(1);
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
// Now safely use process.env
module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 5000,
    nasaApiKey: process.env.NASA_API_KEY,
    cors: {
        origin: process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(',')
            : ['http://socialhypebuc.s3-website.eu-north-1.amazonaws.com'],
        methods: ['GET']
    },
    rateLimiting: {
        windowMs: 15 * 60 * 1000,
        max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100
    },
    cache: {
        enabled: process.env.CACHE_ENABLED === 'true',
        ttl: parseInt(process.env.CACHE_TTL, 10) || 3600
    },
    morgan: {
        format: process.env.MORGAN_FORMAT || 'combined'
    },
    isProduction: process.env.NODE_ENV === 'production'
};