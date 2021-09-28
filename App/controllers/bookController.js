//controller for the REST API
//const mongoose = require('mongoose');
//const Book = mongoose.model('Book');
const BookModel = require('../models/bookModel');

//Return all books
exports.book_list = function(req, res){
    return BookModel.find({}, function(err, books){
        if(!err){
            console.log(books);
            return res.status(200).send(books);
        }
        else{
            console.log(err);
            return res.status(500).send(err);
        }
    });
};

//Return info of one book
exports.book_info = function(req, res){
    return BookModel.findById(req.params.id, function(err, book){
        if(!err && book){
            return res.status(200).send(book);
        }
        else if(!err && !book){
            return res.status(404).send({'message' : 'not found'});
        }
        else{
            console.log(err);
            return res.status(500).send(err);
        }
    });
};

//Creates a new book
exports.book_create = function(req, res){
    console.log(req.body);
    return BookModel.create(req.body, function(err){
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        else{
            return res.status(203).send({'message' : 'created'});
        }
    });
};

//Edits an existing book
exports.book_edit = function(req, res){
    //getting rid of the id as mongo doesn't let us update the id
    delete req.body._id;
    req.body.updated = new Date().getTime();
    return BookModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, book){
        if(err){
            console.log(err);
            return res.status(500).semd(err);
        }
        else if(!book){
            return res.status(404).send({'message' : 'not found'});
        }
        else{
            return res.status(200).send(book);
        }
    });
    //res.send('NOT IMPLEMENTED: Book create: ' + req.params.id);
};

//Deletes a book
exports.book_delete = function(req, res){
    return BookModel.findByIdAndDelete(req.params.id, function(err, book){
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        else if(!book){
            return res.status(404).send({'message' : 'not found'});
        }
    });
    //res.send('NOT IMPLEMENTED: Book delete: ' + req.params.id);
};

