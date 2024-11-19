const mongoose = require("mongoose");

const postModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "owner",
  },
  image: Buffer,
  contact: Number,
  PeopleNeed: Number,
  location:String,
  price: Number,
  timing: String,
  createdTime:{
    type:Date,
    default:new Date.getTime()
  }
});

module.exports = mongoose.model("post", postModel);
