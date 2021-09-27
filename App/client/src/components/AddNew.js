//Component for adding a new book!
import {useState} from 'react';

import Backdrop from './Backdrop';
import EditInfo from './EditInfo';

function AddNew(props){
    const [editingIsOpen, setEditingIsOpen] = useState(false);
    function onAdd(){
        setEditingIsOpen(true);
    }
    function onClose(){
        setEditingIsOpen(false);
    }

    function save(newBook){
        setEditingIsOpen(false);
        props.onSave(newBook);
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