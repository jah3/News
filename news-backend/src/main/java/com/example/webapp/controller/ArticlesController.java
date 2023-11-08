package com.example.webapp.controller;

import com.example.webapp.dto.ArticleRequest;
import com.example.webapp.dto.AuthenticationRequest;
import com.example.webapp.entity.Articles;
import com.example.webapp.entity.Authentication;
import com.example.webapp.repository.ArticlesRepository;
import com.example.webapp.repository.AuthenticationRepository;
import com.example.webapp.service.ArticleService;
import com.example.webapp.service.AuthenticationService;
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
    /*
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
           }*/
    private final ArticlesRepository articlesRepository;

    private final ArticleService articleService;
    private final AuthenticationService authenticationService;

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

    @PostMapping("/user")
    public ResponseEntity<AuthenticationRequest> registerUserCredential(@RequestBody AuthenticationRequest user) {
        AuthenticationRequest registeredUser = authenticationService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @GetMapping("/api/articles")
    public ResponseEntity<List<Articles>> getAllArticles() {
        List<Articles> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    @PostMapping("/create-article")
    public ResponseEntity<ArticleRequest> createArticle(
            @RequestPart("articleRequest") ArticleRequest articleDTO,
            @RequestPart("image") MultipartFile imageFile) {
        try {
            Articles article = articleService.createArticle(articleDTO, imageFile);
            return ResponseEntity.ok(articleDTO); // You might want to return the created article instead
        } catch (IOException e) {
            // Handle the exception properly
            return ResponseEntity.badRequest().build();
        }
    }
}
