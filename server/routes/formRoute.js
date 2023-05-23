const express = require("express");
const formController = require('../controllers/formController');

const router = express.Router();

// Create a new pass
router.post("/", formController.createForm);

module.exports = router;