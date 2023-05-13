const { createUser, findUserByUsername } = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the username or email is already registered
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already registered' });
    }

    // Create a new user
    const user = {
      username,
      password,
      email,
    };

    // Save the user to the database
    const userId = await createUser(user);

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};