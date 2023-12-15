package com.example.webapp.repository;

import com.example.webapp.entity.Articles;
import com.example.webapp.entity.RedisArticle;
import org.springframework.data.repository.CrudRepository;


public interface RedisRepository extends CrudRepository<RedisArticle, String> {
}