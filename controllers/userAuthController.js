const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const usersModel = require("../models/usersModel");
const postsModel = require("../models/postsModel");
const ownersModel = require("../models/ownersModel");
const jwt = require("jsonwebtoken");

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
    console.log("user details");
    console.log(user);
    console.log("owner details");
    console.log(owner);
    res.render("../views/workConsole/mainScreen", { owner, user });
  });
};

module.exports.getContact = async (req, res) => {
  const ownerId = req.params.id;

  console.log("Owner ID:", ownerId);
  const owner = await ownersModel.findById(ownerId);

  console.log(owner);

  if (!owner) {
    return res.status(404).send("Owner not found");
  }

  console.log(owner.email);

  res.render("workConsole/getContact", { owner });
};

module.exports.profile = async (req, res) => {
  const userId = req.params.id;

  console.log("Owner ID:", userId);
  const user = await usersModel.findById(userId);

  console.log(user);

  if (!user) {
    return res.status(404).send("Owner not found");
  }

  console.log(user.email);

  res.render("workConsole/profile", { user });
};

module.exports.home = async (req, res) => {
  if (!req.cookies.token) {
    req.flash("error", "you have to login first");
    return res.rediect("/");
  }

  let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  let user = await usersModel
    .findOne({ email: decoded.email })
    .select("-password");
  req.user = user;

  let owner = await ownersModel.find().populate("Posts").exec();
  res.render("workConsole/mainScreen", { owner, user });
};
