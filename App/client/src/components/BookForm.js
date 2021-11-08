import { useEffect, useState } from "react";

const emptyInfo = {
  title: "",
  author: "",
  description: "",
  _id: null,
};

const BookForm = (props) => {
  const [bookInfo, setBookInfo] = useState({
    title: props.book.title,
    author: props.book.author,
    description: props.book.description,
    _id: props.book._id,
  });

  //USE EFFECT!!!!
  useEffect(() => {
    setBookInfo({
      title: props.book.title,
      author: props.book.author,
      description: props.book.description,
      _id: props.book._id,
    });
  }, [props.book]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.saveBookInfo(bookInfo);

    setBookInfo(emptyInfo);
  };

  const onAuthorChange = (event) => {
    setBookInfo((prev) => {
      return { ...prev, author: event.target.value };
    });
  };

  const onTitleChange = (event) => {
    setBookInfo((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  const onDescriptionChange = (event) => {
    setBookInfo((prev) => {
      return { ...prev, description: event.target.value };
    });
  };

  const onCancelHandler = () => {
    setBookInfo(emptyInfo);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label>Author:</label>
      <input
        type="text"
        value={bookInfo.author}
        onChange={onAuthorChange}
      ></input>

      <label>Title:</label>
      <input
        type="text"
        value={bookInfo.title}
        onChange={onTitleChange}
      ></input>

      <label>Description</label>
      <textarea
        value={bookInfo.description}
        onChange={onDescriptionChange}
      ></textarea>

      <button type="submit">Save</button>
      <button type="button" onClick = {onCancelHandler}>Cancel</button>
    </form>
  );
};

export default BookForm;
