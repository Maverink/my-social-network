const express = require("express");
const router = express.Router();

//@route    GET api/osts/test
//@desc     Tests posts Route
//@access   Public
router.use("/test", (req, res) => {
  res.json({ msg: "posts test working!" });
});

module.exports = router;
