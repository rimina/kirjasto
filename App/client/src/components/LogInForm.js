import { useState } from "react";

const LogInForm = ({ onLogIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (event) => {
        event.preventDefault();
        onLogIn(username, password);
    };

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    };
    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>username</label>{" "}
                <input
                    type="text"
                    onChange={onUsernameChange}
                    value={username}
                ></input>
            </p>
            <p>
                <label>password</label>{" "}
                <input
                    type="password"
                    onChange={onPasswordChange}
                    value={password}
                ></input>
            </p>
            <button className="btn" type="submit">
                log in
            </button>
        </form>
    );
};

export default LogInForm;
