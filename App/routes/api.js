//API routing
const express = require("express");
const cors = require("cors");

//Controllers (there could be more if we had many types of objects)
const bookController = require("../controllers/bookController");

const router = express.Router();
//Enabling preflight
router.options("/", cors());
router.use(function timeLog(req, res, next) {
  next();
});

//POST for creating a book
router.post("/", bookController.book_create);

//GET all books
router.get("/", bookController.book_list);

//PUT for editing a book
router.put("/:id", bookController.book_edit);

//DELETE for deleting a book
router.delete("/:id", bookController.book_delete);

//GET a book
router.get("/:id", bookController.book_info);

module.exports = router;
