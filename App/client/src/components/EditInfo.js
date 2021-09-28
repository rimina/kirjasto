//The 'form' to save, edit and delete books
import {useEffect, useState} from 'react';

import TextFields from './TextFields';

function EditInfo(props){
    //const url = "http://localhost:5000/api/"+props.book._id;
    const [isReady, setReady] = useState(false);
    const [newData, setNewData] = useState(props.book);

    //Save changes to the server
    useEffect(() =>{
        if(isReady){
            const requestOptions = {
                method : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author : newData.author,
                    title : newData.title,
                    description : newData.description
                    })
            };
            fetch("http://localhost:5000/api/"+props.book._id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("ON EDIT HOOK");
                    if(data.errors === undefined){
                        props.onSave(newData);
                    }
                    setReady(false);
                })
                .catch(console.error);
        }
    }, [isReady]);

    function saveBook(tmp){
        //Saving the id so that it don't get lost in the way
        tmp._id = props.book._id;
        console.log(tmp);
        setNewData(tmp);
        setReady(true);
    }

    return(
        <TextFields
            title = {newData.title}
            author = {newData.author}
            description = {newData.description}
            onSave = {saveBook}
            onCancel={props.onCancel}
        />
    );
}

export default EditInfo;