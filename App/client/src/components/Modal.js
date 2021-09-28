

function Modal(props){

    return(
        <div className ='modal'>
            <p>{props.book.title} by {props.book.author}</p>
            <p>{props.book.description}</p>
            
            <button className='btn' onClick={props.onClose}>Close</button>
            <button className='btn' onClick={props.onEdit}>Edit</button>
        </div>
    );

}

export default Modal;