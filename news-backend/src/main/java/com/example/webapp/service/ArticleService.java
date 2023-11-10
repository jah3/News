package com.example.webapp.service;

import com.example.webapp.dto.ArticleRequest;
import com.example.webapp.entity.Articles;
import com.example.webapp.repository.ArticlesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticlesRepository articlesRepository;


    public Articles createArticle(ArticleRequest articleDTO, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            byte[] imageBytes = imageFile.getBytes();
            articleDTO.setImage(imageBytes);
        }

        Articles article = new Articles(articleDTO.getTitle(), articleDTO.getContent());
        article.setImage(articleDTO.getImage());
        return articlesRepository.save(article);
    }
    public List<Articles> getAllArticles() {
        return articlesRepository.findAll();
    }

    public void deleteArticle(String title) {
        var articleFound = articlesRepository.findByTitle(title)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));
        articlesRepository.delete(articleFound);
    }

}
