const nasaService = require('../services/nasaService');
const { validateMarsRequest } = require('../utils/validationUtils');
const logger = require('../utils/logger');

const getMarsPhotos = async (req, res, next) => {
    try {
        const { rover, camera, earth_date } = req.query;

        const validationError = validateMarsRequest({ rover, camera, earth_date });
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const photos = await nasaService.getMarsPhotos(rover, camera, earth_date);
        res.json(photos);
    } catch (error) {
        logger.error(`Mars Controller Error: ${error.message}`, { error });
        next(error);
    }
};

module.exports = {
    getMarsPhotos
};