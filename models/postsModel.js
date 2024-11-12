const mongoose = require("mongoose");

const postModel = mongoose.Schema({
  username: String,
  image: String,
  contact: Number,
  booking: Number,
  price: Number,
  review: Number
});

module.exports = mongoose.model("post", postModel);
