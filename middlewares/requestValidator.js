const { isValidDate, getDateRange } = require('../utils/dateUtils');

const validateDate = (paramName = 'date') => {
    return (req, res, next) => {
        const dateString = req.query[paramName] || req.body[paramName];

        if (!dateString) {
            return res.status(400).json({
                error: `${paramName} parameter is required`
            });
        }

        if (!isValidDate(dateString)) {
            return res.status(400).json({
                error: `Invalid ${paramName} format. Expected YYYY-MM-DD`
            });
        }

        const date = new Date(dateString);
        const today = new Date();

        if (date > today) {
            return res.status(400).json({
                error: `${paramName} cannot be in the future`
            });
        }

        // Attach the validated date to the request object
        req.validatedDate = date;
        next();
    };
};

// Add this to dateUtils.js
const validateDateValue = (dateString, paramName = 'date') => {
    if (!dateString) return `${paramName} parameter is required`;
    if (!isValidDate(dateString)) return `Invalid ${paramName} format. Expected YYYY-MM-DD`;

    const date = new Date(dateString);
    const today = new Date();
    if (date > today) return `${paramName} cannot be in the future`;

    return null; // No error
};
// Convert validator functions to middleware format
const validateMarsRequest = (req, res, next) => {
    const { rover, camera, earth_date } = req.query;
    const validRovers = ['curiosity', 'opportunity', 'spirit'];

    if (!validRovers.includes(rover)) {
        return res.status(400).json({
            error: `Invalid rover. Valid options: ${validRovers.join(', ')}`
        });
    }

    if (!earth_date) {
        return res.status(400).json({ error: 'earth_date parameter is required' });
    }

    const dateError = validateDateValue(earth_date);
    if (dateError) {
        return res.status(400).json({ error: dateError });
    }

    next();
};

const validateAPODRequest = (req, res, next) => {
    const { date, thumbs } = req.query;


    // Validate date if provided
    if (date) {
        const dateError = validateDateValue(date);
        if (dateError) {
            return res.status(400).json({ error: dateError });
        }
    }
    // Validate thumbs parameter if provided (optional enhancement)
    if (thumbs && thumbs !== 'true' && thumbs !== 'false') {
        return res.status(400).json({
            error: 'thumbs parameter must be either "true" or "false"'
        });
    }


    // Validate that date isn't in the future (if provided)
    if (date) {
        const today = new Date();
        const inputDate = new Date(date);
        if (inputDate > today) {
            return res.status(400).json({
                error: 'Date cannot be in the future'
            });
        }
    }
    console.log('next', date);
    next();
};


const validateNEORequest = (req, res, next) => {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
        return res.status(400).json({
            error: 'Both start_date and end_date parameters are required'
        });
    }

    const startDateError = validateDate(start_date);
    if (startDateError) {
        return res.status(400).json({ error: startDateError });
    }

    const endDateError = validateDate(end_date);
    if (endDateError) {
        return res.status(400).json({ error: endDateError });
    }

    try {
        const days = getDateRange(start_date, end_date);
        if (days > 7) {
            return res.status(400).json({
                error: 'Date range must not exceed 7 days'
            });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
};

module.exports = {
    validateMarsRequest,
    validateNEORequest,
    validateAPODRequest
};
