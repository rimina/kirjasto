function Modal(props){

    return(
        <div className ='modal'>
            <p>{props.title} by {props.author}</p>
            <p>{props.description}</p>
            
            <button className='btn' onClick={props.onClose}>Close</button>
            <button className='btn' onClick={props.onEdit}>Edit</button>
            <button className='btn' onClick={props.onDelete}>Delete</button>
            
        </div>
    );

}

export default Modal;