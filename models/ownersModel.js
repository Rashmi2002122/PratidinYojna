const mongoose = require("mongoose");

const ownerModel = mongoose.Schema({
  username: String,
  password: String,
  image: String,
  contact: Number,
  email: {
    type: String,
    unique:true
  },
  Posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  happyOnUser: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("owner", ownerModel);
