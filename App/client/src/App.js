//This component holds the state of the app. I hope.
import React from 'react';
import {useState} from 'react';
import './App.css';

import Book from './components/Book';

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

    /*function componentDidMount() {
      callBackend = async() => {
        const response = await fetch('api');
        console.log(response);
        const body = await response.json();

        if(response.status !== 200){
          throw Error(body.message);
        }
        return body;
      }

      callBackend()
        .then(res => setBookList(bookList))
        .catch(err => console.log(err));//oikeesti books : res
      console.log(this.state);
    }*/

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
    
    return(
        <div className="App">
            <p className ="Book-list">Books:</p>
            <div>{bookCards}</div>
        </div>
    );

}

export default App;
