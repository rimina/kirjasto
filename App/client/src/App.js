//This component holds the state of the app. I hope.

import './App.css';
import React from 'react';
import Book from './Book';
import EditInfo from './EditInfo';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {books : [],
      showInfo : false,
      info : {},
      selectedBook : {
        title : "",
        author : "",
        description :""
      }
    };
  } 

  componentDidMount() {
    this.callBackend()
      .then(res => this.setState({books : res.books}))
      .catch(err => console.log(err));
    console.log(this.state);
  }

  callBackend = async() => {
    const response = await fetch('api');
    console.log(response);
    const body = await response.json();

    if(response.status !== 200){
      throw Error(body.message);
    }
    return body;
  }
  
  render(){
    const bookList = [];
    this.state.books.forEach((book) => {
      bookList.push(<Book author = {book.author} tittle = {book.title} description = {book.description} />);
    });

    return (
      <div className="App">
        <p className ="Book-list">Books:</p>
        <div>{bookList}</div>
        <EditInfo active = {this.state.showInfo} author = {this.state.selectedBook.author} title = {this.state.selectedBook.title} description = {this.state.selectedBook.description} />
      </div>
    );
  }
  
}

export default App;
