//Abstraction for a text field in 'form'
import React from "react";

function InfoField(props){

    //what we know about the field
    const info = {
        text : props.text,
        field : props.field
    }

    //On change handler to keep the component state
    function change(event){
        info.text = event.target.value;
    }

    return(
        <span>{info.field}:<input type="text" defaultValue={info.text} onChange={change}/></span>
    )
}

export default InfoField;