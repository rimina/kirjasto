//The react app component upon which everything is build.
import React from 'react';
import {useEffect, useState} from 'react';
import './App.css';

import Book from './components/Book';
import AddNew from './components/AddNew';

function App(){

  const url = "http://localhost:5000/api";

  //the list of raw data
  const [bookList, setBookList] = useState([]);
  //the list of book card elements
  const [bookCards, setBookCards] = useState([]);
  //should we fetch all the books? (initially yes)
  const [getBooks, setGetBooks] = useState(true);

  useEffect(() => {
    if(getBooks){
      fetch(url)
      .then(response => response.json())
      .then(data => {
        //seting the raw data
        setBookList(data);
        //generating the list from the raw data
        updateCards(data);
        setGetBooks(false);
      })
      .catch(console.error);
    }

  }, [getBooks]);//I could also use [] as a last parameter as this is really ran just once now
  //But I left it there as we could want to fetch all the books again in some situation

  //Deletes a book card
  function deleteBook(b){
    let tmp = bookList;
    let index = tmp.indexOf(b);
    tmp.splice(index, 1);
    updateCards(tmp);
    setBookList(tmp);
  }
  
  //Updates the book cards when needed e.g. new data fetched
  function updateCards(data){
    let tmp = [];
    for(let i = 0; i < data.length; ++i){
      const book = data[i];
      tmp.push(<Book
        book = {book}
        onDelete = {deleteBook}
        key = {book._id}/>);
    }
    setBookCards(tmp);
  }

  //Adds a book card
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
