import Book from "./Book";

const BooksContainer = (props) => {
  const books = props.items.map((info) => {
    return <Book key={info._id} info={info} onClick={props.onSelect} />;
  });

  return <>{books}</>;
};

export default BooksContainer;
