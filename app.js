const express = require('express');
const config = require('./config');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');
const apiLogger = require('./middlewares/apiLogger');

const app = express();
app.use(cors(config.cors));
app.use(helmet());


if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev')); // Start with simple format
}
// Basic middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(config.morgan.format));
    app.use(apiLogger);
}

// Test route
// app.get('/', (req, res) => {
//     res.send('Server is working');
// });
// console.log('erher starte');
app.use('/api', routes);

// app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

