const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { body } = req;
    const insertedId = await userController.createUser(body);
    res.status(201).json({ insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User login route
router.get('/login', async (req, res) => {
    try {
      const { email, password } = req.query;
  
      const user = await userController.findUserByEmail(email);
  
      if (!user) {
        res.status(404).json({ message: 'Email not found' });
        return;
      }
  
      // Assuming you have a function for checking the password validity
      const isPasswordValid = checkPasswordValidity(password, user.password);
  
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Email or password incorrect' });
        return;
      }
  
      // Proceed with next code if email and password match
      // Your code here...
  
      res.status(200).json({ message: 'Login successful' });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;