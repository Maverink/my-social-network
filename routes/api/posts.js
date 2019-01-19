const express = require("express");
const router = express.Router();

router.use("/test", (req, res) => {
  res.json({ msg: "posts test working!" });
});

module.exports = router;
