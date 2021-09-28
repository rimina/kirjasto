//Creating a database model for books

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
    //Books must have tittle and author
    //Title and author string lengths are limited to max 100 characters.
    //Books can have description of 200 characters
    //Books will have information about those were updated
    {
        title : {type: String, required : true, maxlength : 100},
        author : {type: String, required : true, maxlength : 100},
        description : {type: String, required : false, maxlength : 200}
    }
);

//creating a virtual url for getting information of one book
BookSchema.virtual('url').get(function(){return '/api/' + this._id});

//Exporting the schema
module.exports = mongoose.model('BookModel', BookSchema);