const express = require("express");
const mongoose = require("mongoose");

const User = require("../../models/User");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ msg: "Welcome to users test" });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(404).json({ msg: "email already registered" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.email
      });
      newUser.save();
      res.json({ msg: "you ve been registered" });
    }
  });
});

module.exports = router;
