//Component for adding a new book!
import {useEffect, useState} from 'react';

import Backdrop from './Backdrop';
import EditInfo from './EditInfo';

function AddNew(props){
    const url = "http://localhost:5000/api";
    //To initialize the empty state
    const emptyBook = {
        author : "",
        title : "",
        description : ""
    }
    const [editingIsOpen, setEditingIsOpen] = useState(false);
    const [book, setBook] = useState(emptyBook);
    const [isReady, setReady] = useState(false);

    //I know that the book and props dependencies give me error
    //However I'm not sure how to fix this. (My first ever react.js app)
    useEffect(() =>{
        if(isReady){
            console.log("book we are saving: " + book);
            const requestOptions = {
                method : 'POST',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                author : book.author,
                title : book.title,
                description : book.description
                })
            };
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //we don't want to save the book to the list if
                    //there was an error
                    if(isReady && data.errors === undefined){
                        props.onSave(data);
                    }
                    
                    setBook(emptyBook);
                    setReady(false);
                    
                })
                .catch(console.error);
        }
    }, [isReady]);

    function onAdd(){
        setEditingIsOpen(true);
    }
    function onClose(){
        setEditingIsOpen(false);
    }
    function save(newBook){
        setEditingIsOpen(false);
        setBook(newBook);
        setReady(true);
    }

    return(
        <div>
            <button className = "btn" onClick = {onAdd}>Add new</button>
            {editingIsOpen && <Backdrop onClose={onClose}/>}
            {editingIsOpen && <EditInfo
                title = ""
                author = ""
                description = ""
                onClose = {save}
                onCancel={onClose}
            />}
        </div>
    );
}

export default AddNew;