package com.example.webapp.service;

import com.example.webapp.dto.ArticleRequest;
import com.example.webapp.entity.Articles;
import com.example.webapp.entity.RedisArticle;
import com.example.webapp.repository.ArticlesRepository;
import com.example.webapp.repository.RedisRepository;
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
public class RedisArticleService {

    private final ArticlesRepository articlesRepository;
    private final RedisRepository redisRepository;

    public RedisArticle saveArticleToRedis(ArticleRequest articleDTO, List<MultipartFile> imageFiles) throws IOException {
        RedisArticle redisArticle = new RedisArticle();
        redisArticle.setTitle(articleDTO.getTitle());
        redisArticle.setContent(articleDTO.getContent());
        redisArticle.setImage(convertImagesToJson(imageFiles)); // Convert images to JSON

        return redisRepository.save(redisArticle);
    }


    public List<RedisArticle> getAllArticlesFromRedis() {
        return (List<RedisArticle>) redisRepository.findAll();
    }


    public Articles confirmAndSaveArticle(String redisArticleId) {
        RedisArticle redisArticle = redisRepository.findById(redisArticleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found in Redis"));

        Articles article = new Articles();
        article.setTitle(redisArticle.getTitle());
        article.setContent(redisArticle.getContent());
        article.setImagesJson(redisArticle.getImage()); // Set images JSON directly

        return articlesRepository.save(article);
    }

    private String convertImagesToJson(List<MultipartFile> imageFiles) throws IOException {
        List<byte[]> images = new ArrayList<>();
        for (MultipartFile file : imageFiles) {
            if (file != null && !file.isEmpty()) {
                images.add(file.getBytes());
            }
        }
        try {
            return ConvertJson.imagesToJson(images);
        } catch (Exception e) {
            throw new IOException("Error converting images to JSON", e);
        }
    }
}
