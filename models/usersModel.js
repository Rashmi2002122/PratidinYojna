const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  username: String,
  password: String,
  image: String,
  contact: Number,
  isAvialible: Boolean,
  email: String,
  likes: {
    type: Array,
    default: [],
  },
  happyOnWorks: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("user", userModel);
