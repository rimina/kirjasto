import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import LogInForm from "../LogInForm";
const Header = () => {
    const ctx = useContext(AuthContext);
    return (
        <div className="card">
            {!ctx.isLoggedIn ? (
                <LogInForm onLogIn={ctx.onLogIn}></LogInForm>
            ) : (
                <button className="btn" onClick={ctx.onLogOut}>
                    log out
                </button>
            )}
        </div>
    );
};

export default Header;
