package com.example.webapp.controller;

import com.example.webapp.cache.CacheToDatabaseService;
import com.example.webapp.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RedisController {

    private final RedisService redisService;

    private final CacheToDatabaseService cacheToDatabaseService;

    @GetMapping("/redis/data")
    public ResponseEntity<Map<String, Object>> getAllRedisData() {
        return ResponseEntity.ok(redisService.getAllRedisData());
    }


    @PostMapping("/confirm-article/{title}")
    public ResponseEntity<?> confirmArticle(@PathVariable String title) {
        cacheToDatabaseService.confirmAndSaveArticle(title);
        return ResponseEntity.ok().build();
    }
}
