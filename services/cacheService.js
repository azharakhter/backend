const redis = require('redis');
const { promisify } = require('util');
const config = require('../config');
const logger = require('../utils/logger');

let client;
let getAsync;
let setAsync;

if (config.cache.enabled) {
    client = redis.createClient({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    });

    client.on('error', (err) => {
        logger.error(`Redis Error: ${err.message}`);
    });

    client.on('connect', () => {
        logger.info('Connected to Redis');
    });

    getAsync = promisify(client.get).bind(client);
    setAsync = promisify(client.set).bind(client);
}

const get = async (key) => {
    if (!config.cache.enabled) return null;

    try {
        const value = await getAsync(key);
        return value ? JSON.parse(value) : null;
    } catch (err) {
        logger.error(`Cache get error: ${err.message}`);
        return null;
    }
};

const set = async (key, value, ttl) => {
    if (!config.cache.enabled) return;

    try {
        await setAsync(key, JSON.stringify(value), 'EX', ttl);
    } catch (err) {
        logger.error(`Cache set error: ${err.message}`);
    }
};

const connectToCache = async () => {
    if (!config.cache.enabled) return;

    return new Promise((resolve, reject) => {
        client.on('ready', resolve);
        client.on('error', reject);
    });
};

module.exports = {
    get,
    set,
    connectToCache
};