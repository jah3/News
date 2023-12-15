//package com.example.webapp.config;
//
//import com.example.webapp.entity.Articles;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.redis.connection.RedisConnectionFactory;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
//import org.springframework.data.redis.serializer.StringRedisSerializer;
//
//@Configuration
//public class RedisConfig {
//
//    // Existing RedisTemplate bean for String, Object
//    @Bean
//    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
//        RedisTemplate<String, Object> template = new RedisTemplate<>();
//        configureRedisTemplate(template, connectionFactory);
//        return template;
//    }
//
//    // New RedisTemplate bean for String, Articles
//    @Bean
//    public RedisTemplate<String, Articles> redisArticlesTemplate(RedisConnectionFactory connectionFactory) {
//        RedisTemplate<String, Articles> template = new RedisTemplate<>();
//        configureRedisTemplate(template, connectionFactory);
//        return template;
//    }
//
//    private void configureRedisTemplate(RedisTemplate<String, ?> template, RedisConnectionFactory connectionFactory) {
//        template.setConnectionFactory(connectionFactory);
//        template.setKeySerializer(new StringRedisSerializer());
//        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
//    }
//}
