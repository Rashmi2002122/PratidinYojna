const express = require("express");
const router = express.Router();
const { posts, allPosts } = require("../controllers/postControlller");
const isLoggedIn = require("../middlewares/isLoggedIn");
const ownersModel = require("../models/ownersModel");
const upload=require("../config/multer_config");

router.get("/", isLoggedIn, function (req, res) {
  res.render("../views/AdminPanal/dashboard", { owner: req.owner });
});

router.get("/allPosts", isLoggedIn, async (req, res) => {
  let owner = await ownersModel
    .findOne({ email: req.owner.email })
    .populate("Posts").exec();
  console.log(owner);
  res.render("../views/AdminPanal/allPosts", { owner });
});

router.post("/create", isLoggedIn,upload.single("image"), posts);

module.exports = router;
