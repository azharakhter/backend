const nasaService = require('../services/nasaService');
const logger = require('../utils/logger');

const getNEO = async (req, res, next) => {
    try {
        const { start_date, end_date } = req.query;

        const neoData = await nasaService.getNEO(start_date, end_date);
        res.json({
            success: true,
            data: neoData
        });
    } catch (error) {
        logger.error(`NEO Controller Error: ${error.message}`, { error });
        next(error);
    }
};

module.exports = {
    getNEO
};