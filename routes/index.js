const express = require('express');
const router = express.Router();
const apodRoutes = require('./apodRoutes');


router.use('/apod', apodRoutes);

module.exports = router;