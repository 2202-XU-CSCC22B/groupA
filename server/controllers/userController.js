const User = require("../models/userModel");

const createUser = async (request, response) => {
  const { username, email, password } = request.body;

  try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });

      if (existingUser) {
      return response.status(400).json({ error: 'Username or email already exists' });
      }

      // Create a new user
      const newUser = new User({ username, email, password });
      await newUser.save();

      return response.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Server error' });
  }
};

const findUserByEmail = async (req, res) => {
  const { email, password } = req.query;

  try {
    const user = await User.findOne({email}).exec();

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Email or password incorrect' });
    }

    // Proceed with next code if email and password match
    // Your code here...

    return res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};



module.exports = {
  createUser,
  findUserByEmail,
};