const jwt = require("jsonwebtoken");
const ownerModel = require("../models/ownersModel");

const isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "you have to login first");
    return res.rediect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let owner = await ownerModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.owner = owner;
    next();
  } catch (error) {
    req.flash("error", "something went wrong");
    res.rediect("/");
  }
};

module.exports=isLoggedIn;