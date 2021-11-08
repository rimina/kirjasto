import Book from "./Book";

const BooksContainer = (props) => {
  const books = props.items.map((info) => {

    return (
      <li key={info._id}>
        <Book info={info} onClick={props.onSelect} />
      </li>
    );
  });

  return <ul>{books}</ul>;
};

export default BooksContainer;
