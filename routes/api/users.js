const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const gravatar = require("gravatar");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ msg: "Welcome to users test" });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(404).json({ msg: "email already registered" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        r: "pg",
        s: "200",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.email,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(salt, req.body.password, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => console.log(user));
        });
      });
    }
  });
});

module.exports = router;
