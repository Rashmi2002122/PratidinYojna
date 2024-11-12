const mongoose = require("mongoose");

const ownerModel = mongoose.Schema({
  username: String,
  password: String,
  image: String,
  contact: Number,
 
  email: String,
  Posts:{
    type:Array,
    default:[]
  },
  happyOnUser: {
    type: Array,
    default: [],
  }
});

module.exports = mongoose.model("owner", ownerModel);
