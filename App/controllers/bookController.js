//controller for the REST API
const BookModel = require("../models/bookModel");

//Return all books
exports.book_list = function (_req, res) {
  return BookModel.find({}, function (err, books) {
    if (!err) {
      return res.status(200).send(books);
    } else {
      console.log(err);
      return res.status(500).send(err);
    }
  });
};

//Return info of one book
exports.book_info = function (req, res) {
  return BookModel.findById(req.params.id, function (err, book) {
    if (!err && book) {
      return res.status(200).send(book);
    } else if (!err && !book) {
      return res.status(404).send({ message: "not found" });
    } else {
      console.log(err);
      return res.status(500).send(err);
    }
  });
};

//Creates a new book
exports.book_create = function (req, res) {
  return BookModel.create(req.body, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      //let's return the book we added
      const result = arguments["1"];
      return res.status(201).send(result);
    }
  });
};

//Edits an existing book
exports.book_edit = function (req, res) {
  //getting rid of the id as mongo doesn't let us update the id
  delete req.body._id;
  return BookModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { runValidators: true },
    function (err, book) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else if (!book) {
        return res.status(404).send({ message: "not found" });
      } else {
        return res.status(200).send({ id: book._id, message: "edited" });
      }
    }
  );
};

//Deletes a book
exports.book_delete = function (req, res) {
  return BookModel.findByIdAndDelete(req.params.id, function (err, book) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else if (!book) {
      return res.status(404).send({ message: "not found" });
    } else {
      return res.status(200).send({ id: book._id, message: "deleted" });
    }
  });
};
