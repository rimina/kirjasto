//Abstraction for a book in a booklist
import React from 'react';

function Book(props){
    //this is returned when selected book info is fetched
    const description = props.description;
    //TODO: some click callback thing to tell what info to show on the edit view
    //Also books need some kind of id as they will be items in database

    return (
        <div className = "Book">
            <p>{props.title} by {props.author}</p>
        </div>
        
    );
}

export default Book;