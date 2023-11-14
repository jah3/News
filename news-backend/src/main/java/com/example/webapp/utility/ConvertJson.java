package com.example.webapp.utility;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class ConvertJson {

    private static final ObjectMapper mapper = new ObjectMapper();

    public static String imagesToJson(List<byte[]> images) {
        try {
            return mapper.writeValueAsString(images);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting images to JSON", e);
        }
    }

    public static List<byte[]> jsonToImages(String json) {
        try {
            return mapper.readValue(json, new TypeReference<List<byte[]>>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting JSON to images", e);
        }
    }
}
