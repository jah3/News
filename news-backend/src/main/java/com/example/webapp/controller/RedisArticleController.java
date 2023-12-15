package com.example.webapp.controller;

import com.example.webapp.dto.ArticleRequest;
import com.example.webapp.entity.Articles;
import com.example.webapp.entity.RedisArticle;
import com.example.webapp.repository.RedisRepository;
import com.example.webapp.service.RedisArticleService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class RedisArticleController {


    private final RedisRepository redisRepository;
    private final RedisArticleService redisArticleService;


    @PostMapping("/redis/create-article")
    public ResponseEntity<?> createArticleInRedis(
            @RequestPart("articleRequest") ArticleRequest articleDTO,
            @RequestPart("images") List<MultipartFile> imageFiles) {
        try {
            // Logging to check the received data
            System.out.println("Received Article: " + articleDTO.getTitle() + ", Images Count: " + imageFiles.size());

            RedisArticle redisArticle = redisArticleService.saveArticleToRedis(articleDTO, imageFiles);
            return ResponseEntity.ok(redisArticle);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing images: " + e.getMessage());
        }
    }

    @GetMapping("/redis/data")
    public ResponseEntity<List<RedisArticle>> getAllArticlesFromRedis() {
        List<RedisArticle> articles = redisArticleService.getAllArticlesFromRedis();
        return ResponseEntity.ok(articles);
    }
    @DeleteMapping("/redis/delete-article/{id}")
    public ResponseEntity<?> deleteArticleFromRedis(@PathVariable String id) {
        try {
            redisRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting article from Redis: " + e.getMessage());
        }
    }
    @PostMapping("/redis/confirm-article/{redisArticleId}")
    public ResponseEntity<?> confirmAndPublishArticle(@PathVariable String redisArticleId) {
        Articles article = redisArticleService.confirmAndSaveArticle(redisArticleId);
        return ResponseEntity.ok(article);
    }


}
