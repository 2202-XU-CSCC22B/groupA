const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const token = require("../models/token");

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/confirm/:token', userController.confirm);

module.exports = router;
