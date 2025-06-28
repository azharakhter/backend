const express = require('express');
const router = express.Router();
const apodController = require('../controllers/apodController');
const { validateAPODRequest } = require('../middlewares/requestValidator');
const { apiLimiter } = require('../config/rateLimiting');

router.get('/getdata', apiLimiter, validateAPODRequest, apodController.getAPOD);


module.exports = router;