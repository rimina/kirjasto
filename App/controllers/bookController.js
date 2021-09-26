//controller for the REST API
//const mongoose = require('mongoose');
//const Book = mongoose.model('Book');
const BookModel = require('../models/bookModel');

//Return all books
exports.book_list = function(req, res){
    res.send('NOT IMPLEMENTED: book list');
};

//Return info of one book
exports.book_info = function(req, res){
    res.send('NOT IMPLEMENTED: Book info: ' + req.params.id);
};

//Creates a new book
exports.book_create = function(req, res){
    res.send('NOT IMPLEMENTED: Book create');
};

//Edits an existing book
exports.book_edit = function(req, res){
    res.send('NOT IMPLEMENTED: Book create: ' + req.params.id);
};

//Deletes a book
exports.book_delete = function(req, res){
    res.send('NOT IMPLEMENTED: Book delete: ' + req.params.id);
};

