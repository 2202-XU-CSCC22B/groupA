const express = require("express");
const formController = require('../controllers/formController');

const router = express.Router();

// Create a new form
router.post("/submit-form", formController.createForm);

module.exports = router;