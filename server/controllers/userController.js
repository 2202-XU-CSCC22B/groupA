const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const { generateLogToken } = require("../utils");
const Token = require("../models/token");
const crypto = require('crypto');
const nodemailer = require('nodemailer');



// Create User Account
const signup = async (request, response) => {
  
  // If email already exists
  console.log("Email:", request.body.email);
  console.log("Password:", request.body.password);
  let user = await User.findOne({ email : request.body.email });
  if (user) {
    return response.send("Username or Email already exists!");
  }

  try {
    // Create and save new user
    user = new User({
      username: request.body.params.username,
      email: request.body.params.email,
      password: await bcrypt.hash(request.body.params.password, 10),
    });
    await user.save();

    // Generate Verification Token
    const token = new Token(
      { userId: user._id,
        token: crypto.randomBytes(16).toString('hex') 
      }
    );
    await token.save();
    console.log(token);

    // Send mail
    const link = `http://localhost:3000/api/confirm/${token.token}`;
    // const link = `http://localhost:8080/`;

    const verify = await verifmail(user.email, link);
    if(verify) {
      response.status(200).send({
      message: "Email sent! Check your mail"
    });
    } else {
      "Email not sent"
    }
    

  } catch (error) {
      console.error(error);
      return response.status(500).send({ error: 'Server error' });
    };
};

// Activate Account
const confirm = async(request, response) => {
  try{
    const token = await Token.findOne({
      token: request.params.token,
    });

    console.log(token);
    await User.updateOne({_id: token.userId}, {$set: {verified: true}});
    await Token.findByIdAndRemove(token._id);
    response.send("Email verified");

    // response.redirect('http://localhost:8080')

  } catch(error) {
    response.status(400).send("An error occurred");
  }
};

// Login User Account
const login = async(request, response) => {
  try {

    const { email, password } = request.query;
    // Validate input
    if (!email || !password) {
      return response.status(400).send("Email and password are required");
    }

    const user = await User.findOne({ email });

    // User does not exist
    if (!user) {
      return response.status(400).send("Invalid email or password");
    }

    // Check if user is verified
    if (!user.verified) {
      return response.status(400).send("You have to verify your account first");
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(400).send("Invalid password");
    }


        const responseBody = {
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            token: generateLogToken(user),
          }


    response.send(responseBody);
    console.log(request.body);
    // response.send("You have to verify your account first");

  } catch (error) {
    console.error(error);
    return response.status(500).send({ error: 'Server error' });
  };
};

// Send Email
const verifmail = async(email, link) => {
  try {
      let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
              user: process.env.USER_EMAIL,
              pass: process.env.PASSWORD,
          },
      });

      // Send email
      let info = await transporter.sendMail({
          from: process.env.USER, //sender
          to: email, //receiver
          subject: "[Account Verification] Property Pass",
          text: "Welcome",
          html: `
          <div>
              <a href=${link}>Click here to activate your account</a>
          </div>
          `// mail body
      });

      console.log("Mail sent successfully!");
      return info;

  } catch (error) {
      console.log(error, "Mail failed to send");
      return null;
  }
};

// Reset Password
// const resetPass = async(request, response) => {

// }

module.exports = {
  signup,
  login,
  confirm,
};