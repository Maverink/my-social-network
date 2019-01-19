const express = require("express");
const mongoose = require("mongoose");

const User = require("../../models/User");
const gravatar = require("gravatar");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ msg: "Welcome to users test" });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      console.log(user);
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
      newUser.save();
      res.json({ msg: "you ve been registered" });
    }
  });
});

module.exports = router;
