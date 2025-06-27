const { isValidDate, getDateRange } = require('./dateUtils');

const validateDate = (dateString) => {
    if (!isValidDate(dateString)) {
        return 'Invalid date format. Expected YYYY-MM-DD';
    }

    const date = new Date(dateString);
    const today = new Date();

    if (date > today) {
        return 'Date cannot be in the future';
    }

    return null;
};

const validateMarsRequest = ({ rover, camera, earth_date }) => {
    const validRovers = ['curiosity', 'opportunity', 'spirit'];

    if (!validRovers.includes(rover)) {
        return `Invalid rover. Valid options: ${validRovers.join(', ')}`;
    }

    if (!earth_date) {
        return 'earth_date parameter is required';
    }

    const dateError = validateDate(earth_date);
    if (dateError) {
        return dateError;
    }

    return null;
};

const validateNEORequest = ({ start_date, end_date }) => {
    if (!start_date || !end_date) {
        return 'Both start_date and end_date parameters are required';
    }

    const startDateError = validateDate(start_date);
    if (startDateError) {
        return startDateError;
    }

    const endDateError = validateDate(end_date);
    if (endDateError) {
        return endDateError;
    }

    try {
        const days = getDateRange(start_date, end_date);
        if (days > 7) {
            return 'Date range must not exceed 7 days';
        }
    } catch (error) {
        return error.message;
    }

    return null;
};

module.exports = {
    validateDate,
    validateMarsRequest,
    validateNEORequest
};