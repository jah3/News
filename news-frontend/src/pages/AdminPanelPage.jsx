import React, {useEffect, useState} from 'react';
import Sidebar from "../compnents/Sidebar.jsx";
import '../style/AdminPanelStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import AXIOS from "../service/AxiosService.jsx";
import Cookies from "js-cookie";
import AppService from "../service/AppService.jsx";
import styles from "../index.module.css";
import {Button, Table} from "antd";
import Scale from "../compnents/Scale.jsx";

function TestAdminPanel() {
    const [activeTab, setActiveTab] = useState('home');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [users, setUsers] = useState([]);

    //Redis
    const [redisData, setRedisData] = useState([]);


    useEffect(() => {
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
            try {
                const response = await AXIOS.get('/redis/data');
                setRedisData(response.data);
            } catch (error) {
                console.error('Error fetching Redis data:', error);
            }
            try {
                const response = await AXIOS.get('/redis/data');
                console.log("Redis Data:", response.data); // Inspect the data structure
                setRedisData(response.data);
            } catch (error) {
                console.error('Error fetching Redis data:', error);
            }
        };


        fetchArticles();
    }, []);

    const calculateTimeRemaining = (expirationTimestamp) => {
        // Log the received timestamp for debugging
        console.log('Received timestamp:', expirationTimestamp);

        const expiryTime = Number(expirationTimestamp);

        if (isNaN(expiryTime) || !expiryTime) {
            return 'Invalid timestamp';
        }

        const now = new Date().getTime();
        const timeLeft = expiryTime - now; // time left in milliseconds

        if (timeLeft <= 0) {
            return 'Expired';
        }

        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);

        return `${hours}h ${minutes}m`;
    };




    const confirmArticle = async (key) => {
        try {
            await AXIOS.post(`/redis/confirm-article/${key}`);
            await deleteArticleFromRedis(key); // Call to delete the article from Redis

            // Refresh the list of published articles
            fetchPublishedArticles();

            // Refresh the list of Redis data by filtering out the confirmed article
            setRedisData(prevData => prevData.filter(article => article.id !== key));
        } catch (error) {
            console.error('Error confirming article:', error);
        }
    };
    const deleteArticleFromRedis = async (key) => {
        try {
            await AXIOS.delete(`/redis/delete-article/${key}`);
            // Additional logic if needed
        } catch (error) {
            console.error('Error deleting article from Redis:', error);
        }
    };


    const fetchPublishedArticles = async () => {
        try {
            const response = await AXIOS.get('/public/articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching published articles:', error);
        }
    };


    const handleDelete = (titleToDelete) => {
        AppService.deleteArticle(titleToDelete, setArticles);
    };
    const handleSubmit = (event, articleData) => {
        setArticles(prevArticles => [...prevArticles, articleData]);
        AppService.handleSubmit(event, {
            title,
            content,
            selectedFiles, // Note the change from selectedFile to selectedFiles
            setArticles,
            setTitle,
            setContent,
            setSelectedFiles

            // Note the change from setSelectedFile to setSelectedFiles
        });
        window.location.reload()
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
    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
    };
    return (
        <>
            <Scale/>
            <Sidebar onTabChange={handleTabChange}/>
            <div className="main-content">
                {activeTab === 'home' && <div className="container mt-4 ">
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
                                        <button onClick={() => handleDelete(article.title)}
                                                className="btn btn-danger">
                                            <i className="bi bi-trash"></i> Delete
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>

                    </section>
                </div>}
                {activeTab === 'users' &&
                    <div className="container mt-4 "><h3 className={styles.formHeader}>List of users</h3>
                        <Table dataSource={users} columns={userColumns}/></div>}
                {activeTab === 'settings' &&
                    <div className="container mt-4 ">
                        <h3 className={styles.formHeader}>Redis Data</h3>
                        <ul className="list-group">
                            {redisData.map((article) => (
                                <li key={article.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {article.title}
                                    <button onClick={() => confirmArticle(article.id)} className="btn btn-success">
                                        Confirm
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                {/* Add other conditions for different tabs */}
            </div>
        </>
    );
}

export default TestAdminPanel;
