//The react app component upon which everything is build.
import "./App.css";
import Header from "./components/UI/Header";
import BookList from "./components/BookList";
import { AuthContextProvider } from "./store/auth-context";

const bookURL = "http://localhost:5000/api/books";
const userURL = "http://localhost:5000/users";

function App() {
    return (
        <div className="App">
            <AuthContextProvider users={userURL}>
                <Header></Header>
                <BookList url={bookURL}></BookList>
            </AuthContextProvider>
        </div>
    );
}

export default App;
