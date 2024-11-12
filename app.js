const express = require("express");
const app = express();

console.log("Setting up middleware and parsers...");

const cookiesParser = require("cookie-parser");
const path = require("path");
const connector = require("./config/connect");

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookiesParser);

console.log("Loading routes...");
const ownerRouters = require("./routes/ownersRouters");
const userRouters = require("./routes/usersRouters");
const postRouters = require("./routes/postRouters");

app.use("/owner", ownerRouters);
app.use("/user", userRouters);
app.use("/post", postRouters);


console.log("Starting server...");

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
