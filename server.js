const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const db = require("./config/keys").mongoURI;
mongoose.connect(db).then(() => {
  console.log("MONGO CONNECTED!");
});

//Body Parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port);
