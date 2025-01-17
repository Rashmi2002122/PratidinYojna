const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getContact,
  profile,
  home,
} = require("../controllers/userAuthController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/register", (req, res) => {
  res.render("../views/user/register.ejs");
});

router.get("/login", (req, res) => {
  res.render("../views/user/login.ejs");
});

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.get("/home",home);

router.get("/profile/:id", profile);

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

router.get("/getContact/:id", isLoggedIn, getContact);

module.exports = router;
