import { useEffect, useState } from "react";
import axios from "axios";

import BookForm from "./BookForm";
import BooksContainer from "./UI/BooksContainer";

const emptyBook = { title: "", author: "", description: "", _id: null };

const BookList = (props) => {
    const [books, setBooks] = useState([]);
    const [selected, setSelected] = useState(emptyBook);
    const [isActive, setActive] = useState(false);

    const initBooks = (data) => {
        setBooks(data);
    };

    useEffect(() => {
        async function getBooks() {
            const res = await axios.get(props.url).catch((err) => {
                console.error(err);
                return err;
            });

            if (res.status === 200) {
                initBooks(res.data);
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
            setBooks((prev) => {
                return [...prev, res.data];
            });
            setSelected(emptyBook);
            setActive(false);
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
            books[index] = data;
            setSelected(emptyBook);
            setActive(false);
        }
    }

    async function deleteBook(data) {
        const res = await axios
            .delete(props.url + "/" + data._id)
            .catch((err) => {
                console.error(err);
                return err;
            });

        if (res.status === 200) {
            const tmp = books.filter((book) => {
                return book._id !== data._id;
            });
            setBooks(tmp);
            setSelected(emptyBook);
            setActive(false);
        }
    }

    const onSaveHandler = (data) => {
        const edited = books.findIndex((book) => {
            return book._id === data._id;
        });

        if (edited >= 0) {
            editOld(data, edited);
        } else {
            saveNew(data);
        }
    };

    const onBookSelectHandler = (book) => {
        if (isActive) {
            setSelected(emptyBook);
            setActive(false);
        } else {
            setSelected(book);
            setActive(true);
        }
    };

    const onBookDeleteHandler = (data) => {
        const toDelete = books.findIndex((book) => {
            return book._id === data._id;
        });

        if (toDelete >= 0) {
            deleteBook(data);
        }
    };

    return (
        <>
            <BookForm
                book={selected}
                saveBookInfo={onSaveHandler}
                onDelete={onBookDeleteHandler}
            ></BookForm>
            <br />
            <BooksContainer
                items={books}
                onSelect={onBookSelectHandler}
            ></BooksContainer>
        </>
    );
};

export default BookList;
