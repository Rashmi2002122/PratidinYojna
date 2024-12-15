const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { generateToken } = require("../utils/generateToken");
const ownersModel = require("../models/ownersModel");

module.exports.registerOwner = async (req, res) => {
  try {
    let { email, password, username, contact } = req.body;

    let owner = await ownersModel.findOne({ email: email });

    if (owner) return res.status(401).send("you already have an account");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let owner = await ownersModel.create({
            email,
            password: hash,
            username,
            contact,
          });

          let token = generateToken(owner);
          res.cookie("token", token);
          res.send("User created successfully");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginOwner = async (req, res) => {
  let { email, password } = req.body;

  let owner = await ownersModel.findOne({ email: email });
  if (!owner) {
    return res.send("Email and password incorrect");
  }
  bcrypt.compare(password, owner.password, function (err, result) {
    let token = generateToken(owner);
    res.cookie("token", token);
    res.render("../views/AdminPanal/dashboard", { owner });
  });
};

module.exports.updateDetail = async (req, res) => {
  let { username, email, password, contact } = req.body;

  const updateData = {};
  if (username) updateData.username = username;
  if (contact) updateData.contact = contact;
  if (password) updateData.password = password;
  if (req.file) {
    console.log(req.file);
    updateData.image = req.file.path;
  }else{
    console.log("No file uploaded")
  }
  const updateOwner = await ownersModel.findOneAndUpdate(
    { email },
    updateData,
    { new: true }
  );

  if (!updateOwner) {
    return res.status(400).send("Somthing went wrong");
  }

  console.log(updateOwner);
  res.status(200).json({
    message: "User updated successfully",
    user: updateOwner,
  });
};
