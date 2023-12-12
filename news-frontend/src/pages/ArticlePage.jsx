import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'antd';
import {Carousel} from 'react-bootstrap';
import styles from '../index.module.css';
import AXIOS from '../service/AxiosService.jsx';
import Scale from "../compnents/Scale.jsx";

function ArticlePage() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const articlesPerPage = 2;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await AXIOS.get('/public/articles');
                const sortedArticles = response.data.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
                setArticles(sortedArticles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };
        fetchArticles();
    }, []);

    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    const goToPrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const displayedArticles = articles.slice(
        currentPage * articlesPerPage,
        (currentPage + 1) * articlesPerPage
    );

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false
        };
        return new Date(dateString).toLocaleString('en-US', options).replace(',', '');
    };


    const formatContent = (content) => {
        // Split the content by "--" and filter out any empty strings that might be generated
        return content.split('--').filter(text => text).map((paragraph, index) => (
            // Return a new paragraph for each split segment of content
            <p key={index}>{paragraph.trim()}</p>
        ));
    };


    const renderCarousel = (imagesJson) => {
        try {
            const images = JSON.parse(imagesJson);
            return (
                <Carousel interval={null} className={styles.articleCarousel}>
                    {images.map((img, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className={`d-block ${styles.carouselImage}`}
                                src={`data:image/jpeg;base64,${img}`}
                                alt={`Slide ${index}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            );
        } catch {
            return <div>No images available.</div>;
        }
    };

    return (
        <>
            <Scale/>
            <div className={styles.container}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="/news">News</a>
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
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Log In</a>
                                </li>
                                {/*{isLoggedIn && (*/}
                                {/*    <nav className="navbar">*/}
                                {/*        <a href="/admin-panel">Admin Panel</a>*/}
                                {/*    </nav>*/}
                                {/*)}*/}
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className={`container mt-4 ${styles.articleContainer}`}>
                    {displayedArticles.map((article, index) => (
                        <article key={index} className={styles.article}>
                            <header className={styles.articleHeader}>
                                <span className={styles.timePublication}>{formatDate(article.publicationDate)}</span>
                                <h1 className={styles.title}>{article.title}</h1>
                            </header>
                            <div className={styles.articleBody}>
                                {/* First the carousel... */}
                                {article.imagesJson && renderCarousel(article.imagesJson)}

                                {/* ...then the article content, which will overlay the carousel */}
                                <section className={styles.articleContent}>
                                    {formatContent(article.content)}
                                </section>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <Button className={styles.buttonIolki} onClick={goToPrevPage} disabled={currentPage === 0}>
                        Previous
                    </Button>
                    <Button className={styles.buttonIolki} onClick={goToNextPage}
                            disabled={currentPage === totalPages - 1}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ArticlePage;
