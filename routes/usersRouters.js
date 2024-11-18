const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controllers/userAuthController");

router.get("/register", (req, res) => {
  res.render("../views/user/register.ejs");
});

router.get("/login", (req, res) => {
  res.render("../views/user/login.ejs");
});

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.get("/mainScreen",(req,res)=>{
  res.render("../views/workConsole/mainScreen.ejs")
})

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

module.exports = router;
