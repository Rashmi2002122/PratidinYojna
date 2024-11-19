const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const usersModel = require("../models/usersModel");
const postsModel = require("../models/postsModel");
const ownersModel = require("../models/ownersModel");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, username, contact } = req.body;

    let user = await usersModel.findOne({ email: email });

    if (user) return res.status(401).send("you already have an account");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await usersModel.create({
            email,
            password: hash,
            username,
            contact,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          res.send("User created successfully");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  let owner = await ownersModel.find().populate("Posts").exec();

  let user = await usersModel.findOne({ email: email });
  if (!user) {
    return res.send("Email and password incorrect");
  }
  bcrypt.compare(password, user.password, function (err, result) {
    let token = generateToken(user);
    res.cookie("token", token);

    console.log(owner);
    res.render("../views/workConsole/mainScreen", { owner });
  });
};

module.exports.getContact = async (req, res) => {
  const ownerId = req.params.identity;
  const owner = await ownersModel.findOne({ ownerId });

  if (!owner) {
    return res.status(404).send("Owner not found.");
  }
  res.render("../views/workConsole/getContact", { owner });
};
