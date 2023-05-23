const express = require("express");
const formController = require('../controllers/formController');

const router = express.Router();

// Create a new pass
router.post("/", passController.createPass);

module.exports = router;