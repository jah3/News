// Import your CSS module here if you're using one
import styles from '../LoginPage.module.css';
// import AXIOS from "../service/AxiosService.jsx";
// import React, {useState} from "react";
import AppService from "../service/AppService.jsx";
import React, {useState} from "react";
import Scale from "../compnents/Scale.jsx";

const LoginPage = () => {

    const [userNotFound, setUserNotFound] = useState(false);

    const handleLoginClick = () => {
        AppService.handleButtonClick(setUserNotFound);
    };
    const handleLogin = (event) => {
        event.preventDefault();
        console.log('Login attempt');
    };

    return (
        <>
        <Scale/>
            <div className={styles.loginContainer}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="/news">
                            News
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">
                                        Register
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>

                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <h2>Login</h2>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required/>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    {userNotFound && <h4>User does not exists!</h4>}
                    <button type="submit" className={styles.loginButton} onClick={handleLoginClick}>Submit</button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
