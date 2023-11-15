-- Table for storing article information
CREATE TABLE articles
(
    article_id       SERIAL PRIMARY KEY,
    title            VARCHAR(255) NOT NULL,
    publication_date TIMESTAMP    NOT NULL,
    content          TEXT         NOT NULL,
    image            BYTEA
);
ALTER TABLE articles
    DROP COLUMN image,
    ADD COLUMN images_json TEXT;

--login_data
CREATE TABLE authentication
(
    login_id SERIAL PRIMARY KEY,
    email    TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role     varchar(20)
);


