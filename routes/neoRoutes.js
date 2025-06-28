const express = require('express');
const router = express.Router();
const neoController = require('../controllers/neoController');
const { validateAPODRequest } = require('../middlewares/requestValidator');
const { apiLimiter } = require('../config/rateLimiting');

// More strict rate limiting for Mars endpoint (NASA API has stricter limits)
router.get('/getNeo', apiLimiter, validateAPODRequest, neoController.getNEO);


module.exports = router;