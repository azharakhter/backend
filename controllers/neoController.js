const nasaService = require('../services/nasaService');
const { validateNEORequest } = require('../utils/validationUtils');
const logger = require('../utils/logger');

const getNEO = async (req, res, next) => {
    try {
        const { start_date, end_date } = req.query;

        const validationError = validateNEORequest({ start_date, end_date });
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const neoData = await nasaService.getNEO(start_date, end_date);
        res.json(neoData);
    } catch (error) {
        logger.error(`NEO Controller Error: ${error.message}`, { error });
        next(error);
    }
};

module.exports = {
    getNEO
};