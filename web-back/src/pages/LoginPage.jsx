// Import your CSS module here if you're using one
import styles from '../LoginPage.module.css';
import AXIOS from "../service/AxiosService.jsx";
import React, {useState} from "react";

const LoginPage = () => {
    // Function to handle the login logic

    const [userNotFound, setUserNotFound] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        // Here you would handle the login logic, like validating the input and setting the user session
        console.log('Login attempt');
    };
// Function to handle the button click
    const handleButtonClick = () => {
        // Get the values directly from the DOM
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Make the POST request with axios
        AXIOS.post('/user', {username, password})
            .then(response => {
                // Handle the response here
                console.log('User created:', response.data);
               window.location.href = '/admin-panel';
            })
            .catch(error => {
                // Handle errors here
                setUserNotFound(true);
                console.error('There was an error!', error);
            });


    };
    return (

        <div className={styles.loginContainer}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">
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
                                <a className="nav-link" href="/news">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">
                                    Testing
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
                <button type="submit" className={styles.loginButton} onClick={handleButtonClick}>Submit</button>
            </form>
        </div>
    );
};

export default LoginPage;
