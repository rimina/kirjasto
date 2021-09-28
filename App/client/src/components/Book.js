//Abstraction for a book in a booklist
import {useEffect, useState} from 'react';

import Backdrop from './Backdrop';
import EditInfo from './EditInfo';

function Book(props){

    const url = "http://localhost:5000/api/"+props.book._id;

    const [editingIsOpen, setEditingIsOpen] = useState(false);
    const [book, setBook] = useState(props.book);
    const [isReady, setReady] = useState(false);

    //Delete the card and the book
    useEffect(() =>{
        if(isReady){
            const requestOptions = {
                method : 'DELETE'
            };
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setReady(false);
                    if(data.errors === undefined){
                        props.onDelete(book);
                    }
                    
                })
                .catch(console.error);
        }
    }, [isReady]);


    function onEdit(){
        setEditingIsOpen(true);
    }
    function closeEdit(){
        setEditingIsOpen(false);
    }

    function saveEdit(newInfo){
        setBook(newInfo);
        setEditingIsOpen(false);
    }
    function onDelete(){
        setReady(true);
    }

    return (
        <div className = "card">
            <p>{book.title} by {book.author}</p>
            <p>Description: {book.description}</p>
            <button className = "btn" onClick = {onEdit}>Edit</button>
            <button className='btn' onClick={onDelete}>Delete</button>
            {editingIsOpen && <Backdrop/>}
            {editingIsOpen && <EditInfo
                book = {book}
                onSave = {saveEdit}
                onCancel={closeEdit}
            />}
            
        </div>
        
    );
}

export default Book;