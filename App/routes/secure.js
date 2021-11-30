//API routing for logged in users
const express = require("express");
const cors = require("cors");

const router = express.Router();
//Enabling preflight
//router.options("/", cors());

router.get("/profile", (req, res) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

module.exports = router;
