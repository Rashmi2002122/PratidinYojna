const postsModel = require("../models/postsModel");
const ownersModel = require("../models/ownersModel");
const jwt = require("jsonwebtoken");

module.exports.posts = async (req, res) => {
  try {
    // Verify JWT token
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    if (!decoded || !decoded.email || !decoded.id) {
      return res.status(400).send("Invalid token.");
    }

    // Find the owner by email
    const owner = await ownersModel.findOne({ email: decoded.email });
    if (!owner) {
      return res.status(404).send("Owner not found.");
    }

    // Destructure form fields from req.body and validate presence
    const { image, contact, PeopleNeed, location, price, timing } = req.body;

    // Create a new post with the required fields
    const post = await postsModel.create({
      user: decoded.id,
      image:req.file.buffer,
      contact,
      PeopleNeed,
      location,
      price,
      timing,
    });

    console.log(post.image);
    

    owner.Posts.push(post._id);
    await owner.save();

    res.redirect("allPosts");
  } catch (error) {
    console.error("Error in posts controller:", error);
    res.status(500).send("Internal Server Error.");
  }
};


