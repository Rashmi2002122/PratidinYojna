const mongoose = require("mongoose");

const conn=mongoose
  .connect("mongodb+srv://ranjanjena8457:pcRqZCTdoiWGtYCf@yojnaa.z5c9y.mongodb.net/")
  .then(function () {
    console.log("connected");
  })
  .catch(function (err) {
    console.log(err);
  });


module.exports = mongoose.connection;
