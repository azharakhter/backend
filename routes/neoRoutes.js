const express = require('express');
const router = express.Router();
const neoController = require('../controllers/neoController');
const { validateNEORequest } = require('../middlewares/requestValidator');
const { apiLimiter } = require('../config/rateLimiting');

router.get(
    '/neo',
    apiLimiter,
    validateNEORequest,
    neoController.getNEO
);

module.exports = router;