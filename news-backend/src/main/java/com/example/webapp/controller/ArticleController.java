package com.example.webapp.controller;

import com.example.webapp.dto.ArticleRequest;
import com.example.webapp.entity.Articles;
import com.example.webapp.repository.ArticlesRepository;
import com.example.webapp.service.ArticleService;
import com.example.webapp.service.AuthenticationService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;


    @DeleteMapping("/delete/article/{title}")
    public ResponseEntity<?> deleteUserCredential(@PathVariable String title) {
        articleService.deleteArticle(title);
        return ResponseEntity.ok().build(); // Return an appropriate response entity
    }



    @GetMapping("/public/articles")
    public ResponseEntity<List<Articles>> getAllArticles() {
        List<Articles> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/test")
    public String getTest() {
        return "WORK";
    }

//
//    @PostMapping("/create-article")
//    public ResponseEntity<?> createArticle(
//            @RequestPart("articleRequest") ArticleRequest articleDTO,
//            @RequestPart("images") List<MultipartFile> imageFiles) {
//        try {
//            Articles article = articleService.createArticle(articleDTO, imageFiles);
//            return ResponseEntity.ok(article); // It might be more useful to return the created article, including its ID and any other generated fields.
//        } catch (IOException e) {
//            // Handle the exception properly
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing images: " + e.getMessage());
//        }
//    }
}
