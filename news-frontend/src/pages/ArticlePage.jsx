import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'antd';
import {Carousel, Navbar} from 'react-bootstrap';
import styles from '../index.module.css';
import AXIOS from '../service/AxiosService.jsx';
import Scale from "../compnents/Scale.jsx";
import Container from 'react-bootstrap/Container';
import Cookies from 'js-cookie';
import Nav from 'react-bootstrap/Nav'; // Import Nav component

function ArticlePage() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const articlesPerPage = 2;
    const token = Cookies.get('token'); // Replace 'yourTokenName' with the name of your token


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
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Container>
                        <Navbar.Brand href="#home">News</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#features" style={{ backgroundColor: 'transparent !important' }}>[ ]</Nav.Link>
                                <Nav.Link href="#pricing" style={{ backgroundColor: 'transparent !important' }}>[ ]</Nav.Link>
                            </Nav>
                            <Nav>
                                {/* Conditionally render the link based on token presence */}
                                {token ? (
                                    <Nav.Link href="/admin-panel">Profile</Nav.Link>
                                ) : (
                                    <Nav.Link href="/login">Login</Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
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
