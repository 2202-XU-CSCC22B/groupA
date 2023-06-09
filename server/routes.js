const express = require("express");
const SignUp_Login = require("./models/userModel");
const app = express.Router();


const formController = require('./controllers/formController');
const { application } = require("express");

app.post("/submit-form", formController.createForm);

//stuff!
app.post("/add_signuplogin", async (request, response) => {
    const { username, email, password } = request.body;

  try {
    const existingUser = await SignUp_Login.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return response.status(400).json({ error: 'Username or email already exists' });
    }

    // Create a new user
    const newUser = new SignUp_Login({ username, email, password });
    await newUser.save();

    return response.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Server error' });
  }
});


module.exports = app;
