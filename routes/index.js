const express = require('express');
const router = express.Router();
const apodRoutes = require('./apodRoutes');
const marsRoutes = require('./marsRoutes');
const neoRoutes = require('./neoRoutes');



router.use('/apod', apodRoutes);
router.use('/mars', marsRoutes);
router.use('/neo', neoRoutes);

module.exports = router;