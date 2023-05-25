const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Define the User schema
const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,

  username: {
    type: String,
    required: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailToken: {
    type: String,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// userSchema.methods.generateVerificationToken = function() {
//   const user = this;

//   const verificationToken = jwt.sign(
//     { ID: user._id },
//     process.env.USER_VERIFICATION_TOKEN_SECRET,
//     { expiresIn: "7d" },
//   );

//   return verificationToken;

// };

// Create the User model
const User = mongoose.model('User', userSchema);
// Export the User model
module.exports = User;
