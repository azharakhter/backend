const express = require('express');
const router = express.Router();
const marsController = require('../controllers/marsController');
const { validateMarsRequest } = require('../middlewares/requestValidator');
const { apiLimiter } = require('../config/rateLimiting');

// More strict rate limiting for Mars endpoint (NASA API has stricter limits)
router.get('/getPhotos', apiLimiter, validateMarsRequest, marsController.getMarsPhotos);


module.exports = router;