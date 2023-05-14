const mongoose=require('mongoose');

//stuff
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
});

const SignUp_Login = mongoose.model("user", userSchema);
module.exports = SignUp_Login;