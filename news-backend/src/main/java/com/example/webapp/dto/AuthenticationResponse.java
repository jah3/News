package com.example.webapp.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String username;
    String token;

    public AuthenticationResponse(String username, String token) {
        this.username = username;
        this.token = token;
    }
}
