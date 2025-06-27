const axios = require('axios');
const config = require('../config');
const cacheService = require('./cacheService');
const logger = require('../utils/logger');
const { validateDate } = require('../utils/validationUtils');

const NASA_BASE_URL = 'https://api.nasa.gov';

const makeNasaRequest = async (endpoint, params) => {
    try {
        const response = await axios.get(`${NASA_BASE_URL}${endpoint}`, {
            params: {
                ...params,
                api_key: config.nasaApiKey
            },
            timeout: 10000 // 10 seconds timeout
        });
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log('api call error  ')
        logger.error(`NASA API Error: ${error.message}`, {
            endpoint,
            params,
            status: error.response?.status,
            data: error.response?.data
        });
        const serviceError = new Error(error.message || 'Failed to fetch APOD data');
        serviceError.status = error.response?.status || 500;
        serviceError.details = error.response?.data || {
            service: 'NASA APOD',
            timestamp: new Date().toISOString()
        };

        throw serviceError;
    }
};

const getAPOD = async (date) => {
    const cacheKey = `apod:${date || 'today'}`;

    try {
        const cachedData = await cacheService.get(cacheKey);
        if (cachedData) {
            console.log('here serveir comming ')
            logger.debug(`Serving APOD from cache for date: ${date || 'today'}`);
            return cachedData;
        }

        const data = await makeNasaRequest('/planetary/apod', { date });

        await cacheService.set(cacheKey, data, config.cache.ttl);
        return data;
    } catch (error) {
        throw error;
    }
};

const getMarsPhotos = async (rover, camera, earth_date) => {
    const cacheKey = `mars:${rover}:${earth_date}:${camera || 'all'}`;

    try {
        const cachedData = await cacheService.get(cacheKey);
        if (cachedData) {
            logger.debug(`Serving Mars photos from cache for ${rover} on ${earth_date}`);
            return cachedData;
        }

        const data = await makeNasaRequest(
            `/mars-photos/api/v1/rovers/${rover}/photos`,
            { earth_date, camera }
        );

        const photos = data.photos || [];
        await cacheService.set(cacheKey, photos, config.cache.ttl);
        return photos;
    } catch (error) {
        throw error;
    }
};

const getNEO = async (start_date, end_date) => {
    const cacheKey = `neo:${start_date}:${end_date}`;

    try {
        const cachedData = await cacheService.get(cacheKey);
        if (cachedData) {
            logger.debug(`Serving NEO data from cache for ${start_date} to ${end_date}`);
            return cachedData;
        }

        const data = await makeNasaRequest(
            '/neo/rest/v1/feed',
            { start_date, end_date }
        );

        const neoData = data.near_earth_objects || {};
        await cacheService.set(cacheKey, neoData, config.cache.ttl);
        return neoData;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAPOD,
    getMarsPhotos,
    getNEO
};