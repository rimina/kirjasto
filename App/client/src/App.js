//Starting point for the project

import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {data : null};
  } 

  componentDidMount() {
    this.callBackend()
      .then(res => this.setState({data : res.express}))
      .catch(err => console.log(err));
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
    return (
      <div className="App">
        <header className="App-header">
          <p className ="App-intro">{this.state.data}</p>
        </header>
        
      </div>
    );
  }
  
}

export default App;
