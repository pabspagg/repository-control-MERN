const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  time: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
