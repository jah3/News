import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.module.css';
import {Button} from "antd";
import AXIOS from "../service/AxiosService.jsx";
import AppService from "../service/AppService.jsx";
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import {Table} from 'antd';
import {Tab, Nav, Form, ListGroup} from 'react-bootstrap';


const AdminPanelPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [users, setUsers] = useState([]);
    const [key, setKey] = useState('writeArticle');

    useEffect(() => {

        //CheckToken();
        // Fetch articles when the component mounts
        const fetchArticles = async () => {
            try {
                const response = await AXIOS.get('/public/articles');
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }

            try {
                const response = await AXIOS.get('/users'); // Replace with your actual endpoint
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };


        fetchArticles();
    }, []);
    const handleLogout = () => {
        // Remove the 'token' cookie instead of 'userLoggedIn'
        Cookies.remove('token');
        navigate('/news');
    };
    const handleDelete = (titleToDelete) => {
        AppService.deleteArticle(titleToDelete, setArticles);
    };
    const handleSubmit = (event) => {
        AppService.handleSubmit(event, {
            title,
            content,
            selectedFiles, // Note the change from selectedFile to selectedFiles
            setArticles,
            setTitle,
            setContent,
            setSelectedFiles // Note the change from setSelectedFile to setSelectedFiles
        });
    };
    const handleFileChange = (event) => {
        // Set the selectedFiles state to the list of files
        setSelectedFiles(event.target.files);
    };


    const userColumns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ];
    return (
        <section className={styles.container}>
            <section className="navBar">
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
                            aria-expanded="true"
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
                                    <a className="nav-link disabled" href="#" tabIndex="1" aria-disabled="true">
                                        Testing
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="nav-link btn btn-link">
                                        <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>

            <section className="container mt-4 ">
                <form onSubmit={handleSubmit}>
                    <h1 className={styles.formHeader}>Write new Article</h1>
                    <div className="mb-3">
                        <label htmlFor="articleTitle" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="articleTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="articleContent" className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            id="articleContent"
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Select Image</label>
                        <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            onChange={handleFileChange}
                            accept="image/*"
                            multiple // This allows multiple file selection
                        />
                    </div>
                    <Button type="primary" htmlType="submit">Submit Article</Button>
                </form>
            </section>
            {/* Articles list */}
            <section className="container mt-4">
                <h3 className={styles.formHeader}>List of published articles</h3>
                <ul className="list-group">
                    {articles
                        .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)) // Assuming 'publicationDate' is your date field
                        .map((article) => (
                            <li key={article.id} // Use a unique identifier here instead of index
                                className="list-group-item d-flex justify-content-between align-items-center">
                                {article.title}
                                <button onClick={() => handleDelete(article.title)} className="btn btn-danger">
                                    <i className="bi bi-trash"></i> Delete
                                </button>
                            </li>
                        ))
                    }
                </ul>
                <h3 className={styles.formHeader}>List of users</h3>
                <Table dataSource={users} columns={userColumns}/>
            </section>
        </section>
    );
};

export default AdminPanelPage;
