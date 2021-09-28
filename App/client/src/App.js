//The react app component upon which everything is build.
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
        //setting up the data
        updateCards(data);
        setGetBooks(false);
      })
      .catch(console.error);
    }

  }, [getBooks]);

  //Deletes a book card
  //I really wanted to use this function but it messes the state somehow
  /*function deleteBook(b){
    let tmp = bookList;
    const index = tmp.indexOf(b);
    tmp.splice(index, 1);
    updateCards(tmp);
  }*/
  
  //Updates the book cards when needed e.g. new data fetched
  function updateCards(data){
    setBookList(data);
    let tmp = [];
    for(let i = 0; i < data.length; ++i){
      const book = data[i];
      tmp.push(<Book
        book = {book}
        onDelete = {updateBooks}
        baseurl = {url}
        key = {book._id}
      />);
    }
    setBookCards(tmp);
  }

  //I really wanted to use this function but it messes the state somehow
  //Adds a book card
  /*function addBook(b){
    let tmp = bookList;
    tmp.push(b);
    updateCards(tmp);
  }
  */

  //We fetch the booklist when we update the stat in the client
  //This is definitely not an optimal way to do this we really should
  //not retrieve _ALL_ the items from the database everytime something changes
  //However, I don't know react well enough so there is something funky somewhere
  //and because of that the delete and update methods, commented out above,
  //messes up the list state completely. So this is a quick and dirty fix.
  function updateBooks(){
    setGetBooks(true);
  }

  return(
    <div className="App">
      <h1>Books</h1>
      <div>{bookCards}</div>
      <br/>
      <AddNew
        onSave = {updateBooks}
        baseurl = {url}
      />
    </div>
  );

}

export default App;
