import Header from "./UI/Header";
import BookList from "./BookList";

const BookListContainer = (props) => {
    return (
        <>
            <Header url={props.users}></Header>
            <BookList url={props.books}></BookList>
        </>
    );
};

export default BookListContainer;
