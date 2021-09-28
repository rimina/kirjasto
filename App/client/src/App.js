//The react app component upon which everything is build.
import React from 'react';
import {useEffect, useState} from 'react';
import './App.css';

import Book from './components/Book';
import AddNew from './components/AddNew';

function App(){

  const url = "http://localhost:5000/api";

  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setBookList(data);
    })
    .catch(console.error);
  }, []);

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
    console.log(newInfo);
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
