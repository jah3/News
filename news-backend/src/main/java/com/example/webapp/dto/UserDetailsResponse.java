package com.example.webapp.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDetailsResponse {
    private String username;
    private String email;
    private String role;
    // No token here, since it's not safe to display tokens in a list
}
