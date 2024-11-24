const express = require("express");
const router = express.Router();
const { registerOwner, loginOwner } = require("../controllers/authController");

router.get("/register", (req, res) => {
  res.render("../views/owner/register.ejs");
});

router.get("/login", (req, res) => {
  res.render("../views/owner/login.ejs");
});

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

router.post("/registerOwner", registerOwner);

router.post("/loginOwner", loginOwner);

router.get("/ownerSetting", (req, res) => {
  res.render("..viewsAdminPanal/ownerSetting")
});
module.exports = router;
