const mongoose = require("mongoose");
const RepositorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  time: { type: Date, default: Date.now },
});

const RepositoryModel = mongoose.model("Repository", RepositorySchema);
module.exports = RepositoryModel;
