const nasaService = require('../services/nasaService');
const logger = require('../utils/logger');

const getMarsPhotos = async (req, res, next) => {
    try {
        const { rover, camera, earth_date } = req.query;

        const photos = await nasaService.getMarsPhotos(rover, camera, earth_date);
        res.json({
            success: true,
            data: photos
        });
    } catch (error) {
        logger.error(`Mars Controller Error: ${error.message}`, { error });
        next(error);
    }
};

module.exports = {
    getMarsPhotos
};
