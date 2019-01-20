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

        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({ msg: "You ve been registered" }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      res
        .status(404)
        .send("Sorry you not regisred with us, Go to the login page");
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.send("Hello and welcome " + user.name);
      } else {
        res.status(404).send("Sorry Wrong password!");
      }
    });
  });
});

module.exports = router;
