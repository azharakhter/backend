const nasaService = require('../services/nasaService');
const getAPOD = async (req, res, next) => {
    try {

        const { date } = req.query;
        const apodData = await nasaService.getAPOD(date);
        res.json({
            success: true,
            data: apodData
        });
    } catch (error) {
        next(error); // Pass to error handler middleware
    }
};

module.exports = {
    getAPOD
};