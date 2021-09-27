//This component holds the state of the app. I hope.
import React from 'react';
import {useState} from 'react';
import './App.css';

import Book from './components/Book';
import AddNew from './components/AddNew';

function App(){

  const [bookList, setBookList] = useState([
    {
      title : "Lord of the Rings",
      author : "J.R.R. Tolkien",
      description : "Taking the hobits to Isengard",
      id : 0
    },
    {
      title : "Hobits",
      author : "J.R.R. Tolkien",
      description : "Here and there and everywhere.",
      id : 1
    }
  ]);

  function deleteBook(id){
    console.log("deleting item id: " + id);
  }

  const bookCards = [];
  for(let i = 0; i < bookList.length; ++i){
    const book = bookList[i];
    bookCards.push(<Book
      author = {book.author}
      title = {book.title}
      description = {book.description}
      id = {book.id}
      onDelete = {deleteBook} key = {i}/>);
  }

  //Saving new book to the list
  function saveBook(newInfo){
    let newBooks = bookList.slice();
    newInfo.id = newBooks.length;
    newInfo.key = newInfo.id;
    newBooks.push(newInfo);
    setBookList(newBooks);
      //WE SHOULD CALL POST HERE
  }

  return(
    <div className="App">
      <p className ="Book-list">Books:</p>
      <div>{bookCards}</div>
      <br/>
      <AddNew onSave = {saveBook}/>
    </div>
  );

}

export default App;
