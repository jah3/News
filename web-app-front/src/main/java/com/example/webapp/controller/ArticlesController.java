package com.example.webapp.controller;

import com.example.webapp.dto.ArticleRequest;
import com.example.webapp.dto.AuthenticationRequest;
import com.example.webapp.entity.Articles;
import com.example.webapp.entity.Authentication;
import com.example.webapp.repository.ArticlesRepository;
import com.example.webapp.repository.AuthenticationRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ArticlesController {

    private final ArticlesRepository articlesRepository;
    private final AuthenticationRepository authenticationRepository;


    @PostMapping("/user")
    public AuthenticationRequest registerUserCredential(@RequestBody AuthenticationRequest user) {
        var userFound = authenticationRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (userFound.isEmpty()) {
            throw new RuntimeException();
        }
        //authenticationRepository.save(new Authentication(user.getUsername(), user.getPassword()));
        return user;
    }

    @DeleteMapping("/api/delete/article/{title}")
    public ResponseEntity<?> deleteUserCredential(@PathVariable String title) {
        var articleFound = articlesRepository.findByTitle(title);
        System.out.println(articleFound);
        if (articleFound.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found");
        }
        articlesRepository.delete(articleFound.get());
        return ResponseEntity.ok().build(); // Return an appropriate response entity
    }


    @GetMapping("/get-user")
    public ResponseEntity<List<Authentication>> getAllUsers() {
        List<Authentication> users = authenticationRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/api/articles")
    public ResponseEntity<List<Articles>> getAllArticles() {
        List<Articles> articles = articlesRepository.findAll();
        return ResponseEntity.ok(articles);
    }

    @PostMapping("/create-article")
    public ResponseEntity<ArticleRequest> createArticle(
            @RequestPart("articleRequest") ArticleRequest articleDTO,
            @RequestPart("image") MultipartFile imageFile) {

        // Check if an image file is provided
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                byte[] imageBytes = imageFile.getBytes();
                articleDTO.setImage(imageBytes);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body(articleDTO);
            }
        }

        // Save the article with the image data
        Articles article = new Articles(articleDTO.getTitle(), articleDTO.getContent());
        article.setImage(articleDTO.getImage());
        articlesRepository.save(article);

        return ResponseEntity.ok(articleDTO);
    }
}
