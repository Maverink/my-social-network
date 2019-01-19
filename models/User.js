const mongoose = require("mongoose");

const Schema = mongoose.Schema();

const UserSchema = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    defaut: Date.now
  }
};

module.exports = User = mongoose.model("users", UserSchema);