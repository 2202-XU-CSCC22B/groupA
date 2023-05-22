const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const signup = async (request, response) => {
  // const { username, email, password } = request.body;
  const {email} = request.body;
  
  // Check if email is present
  if (!email) {
    return response.status(422).send({ message: "Missing email." });
  }

  try {

    // Check if email is already in use
    const existingUser = await User.findOne({ $or: [{ username }, { email }] }).exec();
    // const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      return response.status(400).send({ message: 'Username or email already exists' });
    }

    // 1. Create and save new user
    const user = await new User({ 
      _id: new mongoose.Types.ObjectId,
      username: username, 
      email: email, 
      password:password 
      // _id: new mongoose.Types.ObjectId,
      // email: email,
    }).save();

    // 2. Generate a verification token with the user's ID
    const verificationToken = user.generateVerificationToken();

    // 3. Email the user a unique verification link
    const url = `http://localhost:3000/api/verify/${verificationToken}`
      transporter.sendMail({
        to: email,
        subject: '[PROPERTY PASS] Verify Account',
        html: `Click <a href = '${url}'>here</a> to confirm your email.`
      })

    return response.status(201).send({ message: `Sent a verification email to ${email}` });
  } catch (error) {
      console.error(error);
      return response.status(500).send({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.query;
  // const { email } = req.body

  // Check if we have an email
  if (!email) {
    return res.status(422).send({ message: "Missing email." });
  }

  try {
    const user = await User.findOne({email}).exec();

    // 1. Verify if email exists
    if (!user) {
      return res.status(404).send({ message: "Email does not exist" });
    }

    // 2. Ensure that the account has been verified
    if (!user.verified) {
      return res.status(403).send({ message: "Verify your account first" });
    }

    if (password !== user.password) {
      return res.status(401).send({ message: 'Password is incorrect' });
    }

    // Proceed with next code if email and password match
    return res.status(200).send({ message: 'Login successful' });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Server error' });
  }
};

const verify = async(req, res) => {
  const {token} = req.params

  // Check if we have an id
  if (!token) {
    return res.status(422).send({ message: "Missing Token" })
  };

  // 1. Verify the token from the URL
  let payload = null
  try {
    payload = jwt.verify(
      token,
      process.env.USER_VERIFICATION_TOKEN_SECRET
    );
  } catch (error) {
    return res.status(500).send(error);
  }

  try{
    // 2. Find user with matching ID
    const user = await User.findOne({ _id: payload.ID }).exec();
    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }

    // 3. Update user verification status to true
    user.verified = true;
    await user.save();

    return res.status(200).send({ message: "Account Verified" });
  } catch (error) {
    return res.status(500).send(error);
  }
}



module.exports = {
  signup,
  login,
  verify,
};