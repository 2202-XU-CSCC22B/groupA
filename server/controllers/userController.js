const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const generateLogToken = require("../utils");
const Token = require("../models/token");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { response, request } = require("express");


// Create User Account
const signup = async (request, response) => {
  
  // If email already exists
  let user = await User.findOne({ email : request.body.email });
  if (user) {
    return response.send("User with given email already exists!");
  };

  try {
    // Create and save new user
    user = new User({
      username: request.body.username,
      email: request.body.email,
      password: await bcrypt.hash(request.body.password, 10),
    });
    await user.save;

    // Generate Verification Token
    const token = new Token(
      { userId: user._id,
        token: crypto.randomBytes(16).toString('hex') 
      }
    );
    await token.save();
    console.log(token);

    // Send mail
    const link = `http://localhost:3000/api/users/confirm/${token.token}`;

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
  } catch(error) {
    response.status(400).send("An error occurred");
  }
};

// Login User Account
const login = async(request, response) => {
  try {
    const user = await User.findOne({ email : request.body.email });

    if (user && user.verified) {
      if (bcrypt.compare(request.body.password, user.password)) {
        response.send(
          {
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            token: generateLogToken(user),
          }
        )
      }
    }

    response.send("You have to verify your account first");

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

module.exports = {
  signup,
  login,
  confirm,
};