import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogOut: () => {},
    onLogIn: () => {},
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const alreadyLoggedIn = localStorage.getItem("accessToken");
        if (alreadyLoggedIn !== undefined) {
            setLoggedIn(true);
            setToken(alreadyLoggedIn);
        }
    }, []);

    async function handleLogIn(email, password) {
        const user = {
            email,
            password,
        };

        const res = await axios
            .post(props.url + "/login", user)
            .catch((err) => {
                console.error(err);
                return err;
            });

        if (res.status === 200) {
            setLoggedIn(true);
            setToken(res.data);
            localStorage.setItem("accessToken", token);
        }
        //TODO: Virheenkäsittely
    }

    const handleLogOut = () => {
        setLoggedIn(false);
        setToken("");
        localStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: loggedIn,
                onLogIn: handleLogIn,
                onLogOut: handleLogOut,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
