//Abstraction for a book in a booklist
import {useState} from 'react';

import Modal from './Modal';
import Backdrop from './Backdrop';
import EditInfo from './EditInfo';

function Book(props){

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingIsOpen, setEditingIsOpen] = useState(false);
    const [book, setBook] = useState({
        author : props.author,
        title : props.title,
        description : props.description
    });

    //this is returned when selected book info is fetched
    //const description = props.description;
    //TODO: some click callback thing to tell what info to show on the edit view
    //Also books need some kind of id as they will be items in database
    function showInfo(){
        setModalIsOpen(true);
    }

    function closeModal(){
        setModalIsOpen(false);
    }

    function onEdit(){
        setEditingIsOpen(true);
    }
    function cancelEdit(){
        setEditingIsOpen(false);
    }

    //we should also save the book info here...
    function saveEdit(newInfo){
        setBook(newInfo);
        setEditingIsOpen(false);
        //WE SHOULD CALL PUT HERE
    }


    function onDelete(){
        setModalIsOpen(false);
        console.log("ID: " + props.id);
        props.onDelete(props.id);  
    }

    return (
        <div className = "card">
            <p>{book.title} by {book.author}</p>
            <button className = "btn" onClick = {showInfo}>Show info</button>
            {modalIsOpen && <Modal 
                title = {book.title}
                author = {book.author}
                description = {book.description}
                onEdit = {onEdit}
                onClose={closeModal}
                onDelete={onDelete}
            />}
            {modalIsOpen && <Backdrop onClose={closeModal}/>}
            {editingIsOpen && <EditInfo
                title = {book.title}
                author = {book.author}
                description = {book.description}
                onClose = {saveEdit}
                onCancel={cancelEdit}
            />}
            
        </div>
        
    );
}

export default Book;