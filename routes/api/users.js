const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretOrPrivateKey = require("../../config/keys").secretOrPrivateKey;

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
      ///////////

      bcrypt.genSalt(10, (err, salt) => {
        console.log("salt is " + salt);
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;

          console.log("hash is " + hash);

          newUser.password = hash;

          newUser
            .save()
            .then(user => {
              console.log(newUser.name + " saved");
            })
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
      return res.status(404).send("sorry you not in our records");
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        //sign the token

        jwt.sign(payload, secretOrPrivateKey, (err, token) => {
          res.json({ msg: "sucess", token: "Bearer " + token });
        });
      } else {
        return res.status(400).json({ msg: "Sorry Password doesnt match" });
      }
    });
    //check password

    // bcrypt.compare(password);
  });
});

module.exports = router;
