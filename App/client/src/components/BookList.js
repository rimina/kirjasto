import { useReducer } from "react";
import BookForm from "./BookForm";
import BooksContainer from "./UI/BooksContainer";

const emptyBook = { title: "", author: "", description: "", _id: null };

const saveBookData = (state, action) => {
  switch (action.type) {
    case "OnSave": {
      const edited = state.books.findIndex((book) => {
        console.log(book._id + " " + action.data._id);
        return book._id === action.data._id;
      });
      if (state.editing && edited >= 0) {
        state.books[edited] = action.data;
        return {
          selectedBook: emptyBook,
          books: state.books,
          editing: false,
        };
      } else {
        action.data._id = Math.random();
        return {
          selectedBook: emptyBook,
          books: [...state.books, action.data],
          editing: false,
        };
      }
    }

    case "onEdit": {
      return {
        selectedBook: action.data,
        books: state.books,
        editing: true,
      };
    }

    default: {
      console.log(state);
    }
  }
};

const BookList = (props) => {
  const [bookListState, dispatchBookListState] = useReducer(saveBookData, {
    books: [
      {
        title: "Hobitti",
        author: "J.R.R. Tolkien",
        description: "moi",
        _id: 10,
      },
    ],
    selectedBook: emptyBook,
    editing: false,
  });

  const onSaveHandler = (data) => {
    dispatchBookListState({
      type: "OnSave",
      data: data,
    });
  };

  const onBookSelectHandler = (book) => {
    console.log(book);
    dispatchBookListState({
      type: "onEdit",
      data: book,
    });
  };

  return (
    <>
      <BookForm
        book={bookListState.selectedBook}
        saveBookInfo={onSaveHandler}
      ></BookForm>
      <BooksContainer
        items={bookListState.books}
        onSelect={onBookSelectHandler}
      ></BooksContainer>
    </>
  );
};

export default BookList;
