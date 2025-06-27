const moment = require('moment');

const formatDate = (date, format = 'YYYY-MM-DD') => {
    return moment(date).format(format);
};

const isValidDate = (dateString) => {
    return moment(dateString, 'YYYY-MM-DD', true).isValid();
};

const getDateRange = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const days = end.diff(start, 'days');

    if (days < 0) {
        throw new Error('End date must be after start date');
    }

    return days;
};

module.exports = {
    formatDate,
    isValidDate,
    getDateRange
};