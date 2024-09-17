import React, { useEffect, useState } from 'react';
import Sidebar from "../compnents/Sidebar.jsx";
import '../style/AdminPanelStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AXIOS from "../service/AxiosService.jsx";
import AppService from "../service/AppService.jsx";
import styles from "../index.module.css";
import { Button, Select, Table } from "antd";
import Scale from "../compnents/Scale.jsx";

const { Option } = Select;

function TestAdminPanel() {
    const [activeTab, setActiveTab] = useState('home');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [articles, setArticles] = useState([]); // State for published articles
    const [tag, setTag] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [users, setUsers] = useState([]);
    const [redisData, setRedisData] = useState([]);

    useEffect(() => {
        // Fetch data when component mounts
        fetchPublishedArticles();
        fetchUsers();
        fetchRedisData();
    }, []);

    const fetchPublishedArticles = async () => {
        try {
            const response = await AXIOS.get('/public/articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching published articles:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await AXIOS.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchRedisData = async () => {
        try {
            const response = await AXIOS.get('/redis/data');
            setRedisData(response.data);
        } catch (error) {
            console.error('Error fetching Redis data:', error);
        }
    };

    const confirmArticle = async (key) => {
        try {
            await AXIOS.post(`/redis/confirm-article/${key}`);
            await deleteArticleFromRedis(key);

            // Refresh the published articles and redis data

            setRedisData((prevData) => prevData.filter((article) => article.id !== key));
            fetchPublishedArticles();
            fetchUsers();
            fetchRedisData();
        } catch (error) {
            console.error('Error confirming article:', error);
        }

    };

    const deleteArticleFromRedis = async (key) => {
        try {
            await AXIOS.delete(`/redis/delete-article/${key}`);
        } catch (error) {
            console.error('Error deleting article from Redis:', error);
        }
    };

    const handleDelete = async (title) => {
        try {
            await AppService.deleteArticle(title, setArticles);
            // Re-fetch published articles after deletion
            fetchPublishedArticles();
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Form data preparation
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tag', tag);
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        try {
            // Call the handleSubmit method from AppService with the correct parameters
            await AppService.handleSubmit(event, {
                title,
                content,
                tag,
                selectedFiles,
                setArticles,
                setTitle,
                setContent,
                setSelectedFiles,
                setTag, // Correctly pass setTag here
            });

            // Refresh published articles
            fetchPublishedArticles();
            fetchUsers();
            fetchRedisData();
        } catch (error) {
            console.error('Error submitting article:', error);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
    };

    return (
        <>
            <Scale />
            <Sidebar onTabChange={handleTabChange} />
            <div className="main-content">
                {activeTab === 'home' && (
                    <div className="container mt-4">
                        <form onSubmit={handleSubmit}>
                            <h1 className={styles.formHeader}>Write New Article</h1>
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
                                <label htmlFor="articleTag" className="form-label">Tag</label>
                                <Select
                                    id="articleTag"
                                    value={tag}
                                    onChange={(value) => setTag(value)}
                                    required
                                    className="form-control"
                                >
                                    <Option value="Crypto">Crypto</Option>
                                    <Option value="Finance">Finance</Option>
                                    <Option value="Technology">Technology</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Select Image</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    multiple
                                />
                            </div>
                            <Button type="primary" htmlType="submit">Submit Article</Button>
                        </form>

                        {/* Published Articles List */}
                        <section className="container mt-4">
                            <h3 className={styles.formHeader}>List of Published Articles</h3>
                            <ul className="list-group">
                                {articles
                                    .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
                                    .map((article) => (
                                        <li
                                            key={article.id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            {article.title}
                                            <button
                                                onClick={() => handleDelete(article.title)}
                                                className="btn btn-danger"
                                            >
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="container mt-4">
                        <h3 className={styles.formHeader}>List of Users</h3>
                        <Table
                            dataSource={users}
                            columns={[
                                { title: 'Username', dataIndex: 'username', key: 'username' },
                                { title: 'Email', dataIndex: 'email', key: 'email' },
                                { title: 'Role', dataIndex: 'role', key: 'role' },
                            ]}
                        />
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="container mt-4">
                        <h3 className={styles.formHeader}>Redis Data</h3>
                        <ul className="list-group">
                            {redisData.map((article) => (
                                <li
                                    key={article.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    {article.title}
                                    <button
                                        onClick={() => confirmArticle(article.id)}
                                        className="btn btn-success"
                                    >
                                        Confirm
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default TestAdminPanel;
