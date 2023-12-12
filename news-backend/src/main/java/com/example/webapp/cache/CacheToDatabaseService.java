package com.example.webapp.cache;

import com.example.webapp.entity.Articles;
import com.example.webapp.repository.ArticlesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class CacheToDatabaseService {

    private  final RedisTemplate<String, Articles> redisTemplate;

    private final ArticlesRepository articlesRepository;

    // Caches the article in Redis for 24 hours
    public void cacheArticle(String key, Articles article) {
        redisTemplate.opsForValue().set(key, article, 24, TimeUnit.HOURS);
    }

    // Confirms and moves the article from Redis to PostgreSQL
    public void confirmAndSaveArticle(String key) {
        Articles article = redisTemplate.opsForValue().get(key);
        if (article != null) {
            articlesRepository.save(article);
            redisTemplate.delete(key);
        }
    }
}
