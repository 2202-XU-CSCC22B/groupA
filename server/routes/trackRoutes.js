const express = require('express');
const trackController = require('../controllers/trackController');
const router = express.Router();

// Retrieve data from MongoDB
router.get("/", trackController.retrieveData);

module.exports = router;
