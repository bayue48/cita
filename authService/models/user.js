const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username must be at most 20 characters long"],
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
