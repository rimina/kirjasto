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

  //There has been changes on the booklist so we should fetch the books from the server
  //This is not the optimal way to do this. For real we should update only the parts needed.
  //Remove items here locally if something is deleted, append the list with new data added
  //and do nothing on book update.
  //Though this is a sure way to keep the state consistent. It's just very inefficient.
  

  function updateCards(data){
    let tmp = [];
    console.log("updating cards...");
    for(let i = 0; i < data.length; ++i){
      const book = data[i];
      tmp.push(<Book
        book = {book}
        onDelete = {updateBooks}
        key = {book._id}/>);
    }
    setBookCards(tmp);
  }

  function updateBooks(){
    setGetBooks(true);
  }

  function addBook(b){
    let tmp = bookList;
    tmp.push(b);
    updateCards(tmp);
    setBookList(tmp);
  }
  
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
