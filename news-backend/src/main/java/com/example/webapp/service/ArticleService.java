package com.example.webapp.service;

import com.example.webapp.cache.CacheToDatabaseService;
import com.example.webapp.dto.ArticleRequest;
import com.example.webapp.entity.Articles;
import com.example.webapp.repository.ArticlesRepository;
import com.example.webapp.utility.ConvertJson;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticlesRepository articlesRepository;
    private final CacheToDatabaseService cacheToDatabaseService;

    public Articles createArticle(ArticleRequest articleDTO, List<MultipartFile> imageFiles) throws IOException {
        List<byte[]> images = new ArrayList<>();
        for (MultipartFile file : imageFiles) {
            if (file != null && !file.isEmpty()) {
                images.add(file.getBytes());
            }
        }

        Articles article = new Articles();
        article.setTitle(articleDTO.getTitle());
        article.setContent(articleDTO.getContent());
        article.setImages(images); // Convert and set the images as JSON string

        // Store in Redis instead of directly saving to PostgreSQL
        cacheToDatabaseService.cacheArticle(article.getTitle(), article);
        return article;


        //return articlesRepository.save(article);

    }

    public List<Articles> getAllArticles() {
        return articlesRepository.findAll();
    }

    public void deleteArticle(String title) {
        Articles articleFound = articlesRepository.findByTitle(title)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));
        articlesRepository.delete(articleFound);
    }
}
