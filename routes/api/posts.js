const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ msg: "welcome to posts test" });
});

module.exports = router;
