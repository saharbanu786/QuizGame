const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  role: {
    type: String,
    enum: ["admin", "user"], // You can define roles here as needed
    default: "user", // Default role is 'user' if not specified
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
