const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,

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
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);
// Export the User model
module.exports = User;