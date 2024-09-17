package com.example.webapp.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "Article", timeToLive = 86400L) // Set TTL to 24 hours (86400 seconds)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RedisArticle {
    @Id
    String id;

    String title;
    String content;
    String image;
    String tag;

    @TimeToLive
    Long expirationInSeconds;
}
