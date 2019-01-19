const express = require("express");
const router = express.Router();

//@route    GET api/users/test
//@desc     Tests user Route
//@access   Public
router.get("/test", (req, res) => {
  res.json({ msg: "user test working!" });
});

module.exports = router;
