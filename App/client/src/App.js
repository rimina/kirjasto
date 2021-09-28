//The react app component upon which everything is build.
import React from 'react';
import {useEffect, useState} from 'react';
import './App.css';

import Book from './components/Book';
import AddNew from './components/AddNew';

function App(){

  const url = "http://localhost:5000/api";

  const [bookList, setBookList] = useState([]);
  const [getBooks, setGetBooks] = useState(true);
  const [bookCards, setBookCards] = useState([]);

  useEffect(() => {
    if(getBooks){
      fetch(url)
      .then(response => response.json())
      .then(data => {
        setBookList(data);
        updateCards(data);
        setGetBooks(false);
      })
      .catch(console.error);
    }

  }, [getBooks]);

  function deleteBook(b){
    const index = bookList.indexOf(b);
    console.log(index);
    let tmp = bookList;
    tmp.splice(index, 1);
    updateCards(tmp);
    setBookList(tmp);
  }
  
  function updateCards(data){
    let tmp = [];
    console.log("updating cards...");
    for(let i = 0; i < data.length; ++i){
      const book = data[i];
      tmp.push(<Book
        book = {book}
        onDelete = {deleteBook}
        key = {book._id}/>);
    }
    setBookCards(tmp);
  }

  function addBook(b){
    let tmp = bookList;
    tmp.push(b);
    updateCards(tmp);
    setBookList(tmp);
  }

  //If we wanted to update all the books we could use this
  //Now we fetch the books only when the program starts
  /*function updateBooks(){
    setGetBooks(true);
  }*/

  return(
    <div className="App">
      <h1>Books</h1>
      <div>{bookCards}</div>
      <br/>
      <AddNew onSave = {addBook}/>
    </div>
  );

}

export default App;
