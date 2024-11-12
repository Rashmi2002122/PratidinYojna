const mongoose = require("mongoose");

const conn=mongoose
  .connect("mongodb://localhost:27017/project")
  .then(function () {
    console.log("connected");
  })
  .catch(function (err) {
    console.log(err);
  });


module.exports = mongoose.connection;
