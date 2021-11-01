const Book = (props) => {
  return (
    <div>
      Author: {props.info.author}
      <br />
      Title: {props.info.title}
      <br />
      Description: {props.info.description}
    </div>
  );
};

export default Book;
