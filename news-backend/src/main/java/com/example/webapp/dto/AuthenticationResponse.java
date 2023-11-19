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
    String email;
    String token;

    public AuthenticationResponse(String username,String email, String token) {
        this.username = username;
        this.email = email;
        this.token = token;
    }
}
