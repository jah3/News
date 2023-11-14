import React, {useState} from 'react';
import styles from '../LoginPage.module.css';
//import AXIOS from "../service/AxiosService.jsx";
//import Cookies from "js-cookie";
import AppService from "../service/AppService.jsx";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    const navigate = useNavigate(); // Make sure to use the useNavigate hook to redirect

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        setUserAlreadyExists(false); // Reset the error state
        AppService.registerButton(setUserAlreadyExists, navigate); // Pass navigate as an argument
    };

    return (

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
                                <a className="nav-link" href="/login">
                                    Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h1>Register</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                {userAlreadyExists && <h5>Username already exists</h5>}
                <button type="submit" className={styles.loginButton} onClick={handleSubmit}>Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
