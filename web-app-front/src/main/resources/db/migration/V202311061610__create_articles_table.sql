-- Table for storing article information
CREATE TABLE articles
(
    article_id       SERIAL PRIMARY KEY,
    title            VARCHAR(255) NOT NULL,
    publication_date TIMESTAMP    NOT NULL,
    content          TEXT         NOT NULL,
    image            BYTEA
);
/*CREATE TABLE article_images
(
    image_id    SERIAL PRIMARY KEY,
    article_id  INT NOT NULL,
    image       BYTEA,
    FOREIGN KEY (article_id) REFERENCES articles (article_id)
);
*/
--login_data
CREATE TABLE authentication
(
    login_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);


