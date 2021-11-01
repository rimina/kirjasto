import { useState, useReducer } from "react";
import BookForm from "./BookForm";
import BooksContainer from "./UI/BooksContainer";

const saveBookData = (state, action) => {
  switch (action.type) {
    case "OnSave": {
      return {
        selectedBook: action.data,
        books: [...state.books, action.data],
        editing: false,
      };
    }

    default: {
      console.log(state);
    }
  }
};

const BookList = (props) => {
  /*const [books, setBooks] = useState([
    {
      title: "Hobitti",
      author: "J.R.R. Tolkien",
      description: "moi",
      _id: Math.random(),
    },
  ]);

  const [selectedBook, setSelectedBook] = useState({
    author: "",
    title: "",
    description: "",
    _id: null,
  });*/

  const [bookListState, dispatchBookListState] = useReducer(saveBookData, {
    books: [
      {
        title: "Hobitti",
        author: "J.R.R. Tolkien",
        description: "moi",
        _id: Math.random(),
      },
    ],
    selectedBook: {
      author: "",
      title: "",
      description: "",
      _id: null,
    },
    editing: false,
  });

  const onSaveHandler = (data) => {
    /*setSelectedBook(data);
    console.log(data);
    console.log(selectedBook);*/
    dispatchBookListState({
      type: "OnSave",
      data: data,
    });
  };

  return (
    <>
      <BookForm
        book={bookListState.selectedBook}
        saveBookInfo={onSaveHandler}
      ></BookForm>
      <BooksContainer items={bookListState.books}></BooksContainer>
    </>
  );
};

export default BookList;
