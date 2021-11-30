import { useEffect, useReducer } from "react";
import axios from "axios";

import BookForm from "./BookForm";
import BooksContainer from "./UI/BooksContainer";

const emptyBook = { title: "", author: "", description: "", _id: null };

const saveBookData = (state, action) => {
  switch (action.type) {
    case "onAdd": {
      return {
        selectedBook: emptyBook,
        newBook: emptyBook,
        editedBook: state.editedBook,
        books: [...state.books, action.book],
        selectionActive: state.selectionActive,
      };
    }

    case "onEdit": {
      state.books[action.index] = action.book;
      return {
        selectedBook: emptyBook,
        editedBook: action.book,
        newBook: state.newBook,
        books: state.books,
        selectionActive: state.selectionActive,
      };
    }

    case "onDelete": {
      const tmp = state.books.filter((book) => {
        return book._id !== action.book._id;
      });
      return {
        selectedBook: emptyBook,
        editedBook: state.book,
        newBook: state.newBook,
        books: tmp,
        selectionActive: state.selectionActive,
      };
    }

    case "onInit": {
      return {
        selectedBook: state.selectedBook,
        editedBook: state.editedBook,
        newBook: state.newBook,
        books: action.books,
        selectionActive: state.selectionActive,
      };
    }

    case "onSelect": {
      if (state.selectionActive) {
        return {
          selectedBook: emptyBook,
          editedBook: state.editedBook,
          newBook: state.newBook,
          books: state.books,
          selectionActive: false,
        };
      } else {
        return {
          selectedBook: action.book,
          editedBook: state.editedBook,
          newBook: state.newBook,
          books: state.books,
          selectionActive: true,
        };
      }
    }

    default: {
      console.log(state);
    }
  }
};

const BookList = (props) => {
  const [bookListState, dispatchBookListState] = useReducer(saveBookData, {
    books: [],
    selectedBook: emptyBook,
    editedBook: emptyBook,
    newBook: emptyBook,
    selectionActive: false,
  });

  useEffect(() => {
    async function getBooks() {
      const res = await axios.get(props.url).catch((err) => {
        console.error(err);
        return err;
      });

      if (res.status === 200) {
        dispatchBookListState({
          type: "onInit",
          books: res.data,
        });
      }
    }
    getBooks();
  }, [props.url]);

  async function saveNew(data) {
    const book = {
      author: data.author,
      title: data.title,
      description: data.description,
    };
    const res = await axios.post(props.url, book).catch((err) => {
      console.error(err);
      return err;
    });

    if (res.status === 201) {
      dispatchBookListState({
        type: "onAdd",
        book: res.data,
      });
    }
  }

  async function editOld(data, index) {
    const book = {
      author: data.author,
      title: data.title,
      description: data.description,
    };

    const res = await axios
      .put(props.url + "/" + data._id, book)
      .catch((err) => {
        console.error(err);
        return err;
      });

    if (res.status === 200) {
      dispatchBookListState({
        type: "onEdit",
        index: index,
        book: data,
      });
    }
  }

  async function deleteBook(data) {
    const res = await axios.delete(props.url + "/" + data._id).catch((err) => {
      console.error(err);
      return err;
    });

    if (res.status === 200) {
      dispatchBookListState({
        type: "onDelete",
        book: data,
      });
    }
  }

  const onSaveHandler = (data) => {
    const edited = bookListState.books.findIndex((book) => {
      return book._id === data._id;
    });

    if (edited >= 0) {
      editOld(data, edited);
    } else {
      saveNew(data);
    }
  };

  const onBookSelectHandler = (book) => {
    dispatchBookListState({
      type: "onSelect",
      book: book,
    });
  };

  const onBookDeleteHandler = (data) => {
    const toDelete = bookListState.books.findIndex((book) => {
      return book._id === data._id;
    });

    if (toDelete >= 0) {
      deleteBook(data);
    }
  };

  return (
    <>
      <BookForm
        book={bookListState.selectedBook}
        saveBookInfo={onSaveHandler}
        onDelete={onBookDeleteHandler}
      ></BookForm>
      <br />
      <BooksContainer
        items={bookListState.books}
        onSelect={onBookSelectHandler}
      ></BooksContainer>
    </>
  );
};

export default BookList;
