//The 'form' to save, edit and delete books
import {useState} from 'react';

function EditInfo(props){

    const [author, setAuthor] = useState(props.author);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    //I'm not quite sure how to do this in more elegant way
    //dividing the fields to their own component felt overkill here.
    function saveAuthor(event){
        setAuthor(event.target.value);
    };
    function saveTitle(event){
        setTitle(event.target.value);
    };
    function saveDescription(event){
        setDescription(event.target.value);
    };

    function saveBook(){
        const book = {
            author : author,
            title : title,
            description : description
        };
        props.onClose(book);
    }

    return(
        <div className ="editInfo">
            <span>Title:<input type="text" defaultValue={title} onChange={saveAuthor}/></span><br />
            <span>Author:<input type="text" defaultValue={author} onChange={saveTitle}/></span><br />
            <span>Description:<input type="text" defaultValue={description} onChange={saveDescription}/></span><br />

            <button className = "btn" onClick={props.onCancel}>Cancel</button> 
            <button className = "btn" onClick={saveBook}>Save</button>
        </div>
    );
}

export default EditInfo;