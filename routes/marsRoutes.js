const express = require('express');
const router = express.Router();
const marsController = require('../controllers/marsController');
const { validateMarsPhotosRequest } = require('../middlewares/requestValidator');
const { createRateLimiter } = require('../config/rateLimiting');

// More strict rate limiting for Mars endpoint (NASA API has stricter limits)
const marsRateLimiter = createRateLimiter(15 * 60 * 1000, 30); // 30 requests per 15 minutes

router.get(
    '/mars-photos',
    marsRateLimiter,
    validateMarsPhotosRequest,
    marsController.getMarsPhotos
);

module.exports = router;