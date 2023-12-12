package com.example.webapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    public Map<String, Object> getAllRedisData() {
        Set<String> keys = redisTemplate.keys("*");
        if (keys == null || keys.isEmpty()) {
            return Collections.emptyMap();
        }

        Map<String, Object> data = new HashMap<>();
        for (String key : keys) {
            data.put(key, redisTemplate.opsForValue().get(key));
        }
        return data;
    }
}
