import { useState } from "react";

const Book = (props) => {
  const [showDescription, setShowDescription] = useState(false);
  const onBookClick = () => {
    setShowDescription(!showDescription);
    props.onClick(props.info);
  };

  return (
    <div onClick={onBookClick} className="card">
      Author: {props.info.author}
      <br />
      Title: {props.info.title}
      {showDescription && <p>Description: {props.info.description}</p>}
    </div>
  );
};

export default Book;
