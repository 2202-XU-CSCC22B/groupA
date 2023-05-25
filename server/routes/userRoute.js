const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
// router.post('/login', userController.login);
// router.put('/verify/:id', userController.verify);

module.exports = router;
