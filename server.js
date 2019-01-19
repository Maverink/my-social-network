const express = require("express");

const app = express();

const mongoose = require("mongoose");

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => {
    console.log("connected");
  })
  .catch(err => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("ok");
});

const port = process.env.PORT || 5000;

app.listen(port);
