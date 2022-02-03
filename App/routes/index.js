//root router
const express = require("express");
const router = express.Router();

router.use(function timeLog(_req, _res, next) {
  next();
});

router.get("/", (req, res) => {
  res.send("Server is running!");
});

module.exports = router;
