//The 'form' to save, edit and delete books
import React from 'react';
import InfoField from './InfoField';

function EditInfo(props){

    //I plan to use this value to determine which buttons can be pushed
    let active = true;
    if(!props.showInfo){
        active = false;
    }

    return(
        <div className ="editInfo">
            <InfoField field="Title" text={props.title}/><br />
            <InfoField field="Author" text={props.author}/><br />
            <InfoField field="Description" text={props.description}/><br />
            <button>Save new</button> 
            <button>Save changes</button> 
            <button>delete</button>
        </div>
    );
}

export default EditInfo;