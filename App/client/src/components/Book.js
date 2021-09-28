//Abstraction for a book in a booklist
import {useEffect, useState} from 'react';

import Modal from './Modal';
import Backdrop from './Backdrop';
import EditInfo from './EditInfo';

function Book(props){

    const url = "http://localhost:5000/api/"+props.book._id;

    const [modalIsOpen, setModalIsOpen] = useState(false);
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
                    if(data.errors === undefined){
                        props.onDelete();
                    }
                    setReady(false);
                })
                .catch(console.error);
        }
    }, [isReady]);

    function showInfo(){
        setModalIsOpen(true);
    }

    function closeModal(){
        setModalIsOpen(false);
    }

    function onEdit(){
        setEditingIsOpen(true);
    }
    function closeEdit(){
        setEditingIsOpen(false);
    }

    //we should also save the book info here...
    function saveEdit(newInfo){
        setBook(newInfo);
    }
    function onDelete(){
        setModalIsOpen(false);
        setReady(true);
    }

    return (
        <div className = "card">
            <p>{book.title} by {book.author}</p>
            <button className = "btn" onClick = {showInfo}>Show info</button>
            <button className='btn' onClick={onDelete}>Delete</button>
            {modalIsOpen && <Modal 
                book = {book}
                onEdit = {onEdit}
                onClose={closeModal}
                onDelete={onDelete}
            />}
            {modalIsOpen && <Backdrop onClose={closeModal}/>}
            {editingIsOpen && <EditInfo
                book = {book}
                onSave = {saveEdit}
                onCancel={closeEdit}
            />}
            
        </div>
        
    );
}

export default Book;