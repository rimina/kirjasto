//API routing for users
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const jwt = require("jsonwebtoken");

//Controllers (there could be more if we had many types of objects)
const userController = require("../controllers/userController");

const router = express.Router();
//Enabling preflight
router.options("/", cors());
router.options("/login", cors());

//POST for creating a book
router.post(
  "/",
  passport.authenticate("signup", { session: false }),
  userController.user_signup
);

router.post("/login", userController.user_login);

//GET all users
router.get("/", userController.user_list);

//PUT for editing a user
//router.put("/:id", userController.user_edit);

//DELETE for deleting a user
//router.delete("/:id", userController.user_delete);

//GET an user
//router.get("/:id", userController.user_info);

module.exports = router;
