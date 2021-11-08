const Book = (props) => {
  const onBookClick = () => {
    props.onClick(props.info);
  };

  return (
    <div onClick={onBookClick}>
      Author: {props.info.author}
      <br />
      Title: {props.info.title}
      <br />
      Description: {props.info.description}
    </div>
  );
};

export default Book;
