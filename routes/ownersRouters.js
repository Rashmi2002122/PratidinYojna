const express = require("express");
const router = express.Router();
const { registerOwner, loginOwner } = require("../controllers/authController");
const ownersModel = require("../models/ownersModel");

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

router.get("/ownerSetting/:id", async (req, res) => {
  const ownerId = req.params.id;
  const owner = await ownersModel.findById(ownerId);

  res.render("AdminPanal/ownerSetting", { owner });
});
module.exports = router;
