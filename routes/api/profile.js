const express = require("express");
const router = express.Router();

//@route    GET api/profile/test
//@desc     Tests profile Route
//@access   Private
router.get("/test", (req, res) => {
  res.json({ msg: "profile test working!" });
});

module.exports = router;
