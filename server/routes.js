const express = require("express");
const router = express.Router();
const SignUp_Login = require("./model");
const formController = require('./controllers/formController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/submit-form", formController.createForm);

// Route for file upload
router.post('/upload', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    console.log(req.file); // Access the uploaded file using req.file object
  
    // Respond with a success message or perform further operations
    res.send('File uploaded successfully');
  });
  
//stuff!
router.post("/add_signuplogin", async (request, response) => {
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

module.exports = router;