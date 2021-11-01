//The react app component upon which everything is build.
import "./App.css";
import BookList from "./components/BookList";

const url = "http://localhost:5000/api";

function App() {
  return (
    <div className="App">
      <BookList url={url}></BookList>
    </div>
  );
}

export default App;
