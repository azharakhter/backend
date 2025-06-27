const express = require('express');
const router = express.Router();
const apodController = require('../controllers/apodController');
const { validateAPODRequest } = require('../middlewares/requestValidator');
const { apiLimiter } = require('../config/rateLimiting');
// const { validateAPODRequest } = require('../middlewares/requestValidator');

router.get('/getdata', apiLimiter, validateAPODRequest, apodController.getAPOD);
// router.get(
//     '/apod',
//     // rateLimiter,
//     // validator.validateAPODRequest,
//     apodController.getAPOD
// );

module.exports = router;