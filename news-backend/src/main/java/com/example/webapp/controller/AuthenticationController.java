package com.example.webapp.controller;

import com.example.webapp.dto.AuthenticationRequest;
import com.example.webapp.dto.AuthenticationResponse;
import com.example.webapp.service.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

    AuthenticationService authenticationService;

    @PostMapping("/authentication")
    public ResponseEntity<AuthenticationResponse> registerUserCredential(HttpServletRequest request, HttpServletResponse response, @RequestBody AuthenticationRequest user) {
        AuthenticationResponse loggedUser = authenticationService.loginUser(user);

        var cookie = new Cookie("token", loggedUser.getToken());

        cookie.setPath("/");
        //cookie.setMaxAge(720000);
        response.addCookie(cookie);
        return ResponseEntity.ok(loggedUser);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> registerUserCredential2(@RequestBody AuthenticationRequest user) {
        AuthenticationResponse registeredUser = authenticationService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }
}
