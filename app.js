const express = require("express");
const app = express();

const cookiesParser = require("cookie-parser");
const path = require("path");
const connector = require("./config/connect");

const expressSession = require("express-session");
const flash = require("connect-flash");

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'ranjan',
  })
);
app.use(express.json());
app.use(flash());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookiesParser());

require("dotenv").config();

console.log("Loading routes...");
const intro = require("./routes/index");
const ownerRouters = require("./routes/ownersRouters");
const userRouters = require("./routes/usersRouters");
const postRouters = require("./routes/postRouters");

app.use("/", intro);
app.use("/owner", ownerRouters);
app.use("/user", userRouters);
app.use("/post", postRouters);

console.log("Starting server...");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
