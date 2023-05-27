const express = require('express');
const router = express.Router();

const submitController = require('../controllers/formController');

// POST /api/submit
router.post('/', submitController.submitForm);

module.exports = router;