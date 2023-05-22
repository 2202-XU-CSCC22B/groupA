const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Define the User schema
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the User model
// const User = mongoose.model('User', userSchema);

userSchema.methods.generateVerificationToken = function() {
  const user = this;

  const verificationToken = jwt.sign(
    { ID: user._id },
    process.env.USER_VERIFICATION_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  return verificationToken;

};

// Export the User model
module.exports = mongoose.model('User', userSchema);
