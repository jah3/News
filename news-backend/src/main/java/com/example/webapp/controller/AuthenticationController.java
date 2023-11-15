package com.example.webapp.controller;

import com.example.webapp.dto.AuthenticationRequest;
import com.example.webapp.dto.AuthenticationResponse;
import com.example.webapp.dto.UserDetailsResponse;
import com.example.webapp.repository.AuthenticationRepository;
import com.example.webapp.service.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
//@RequestMapping("/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

    AuthenticationService authenticationService;

    @PostMapping("/auth/authentication")
    public ResponseEntity<AuthenticationResponse> registerUserCredential(HttpServletRequest request, HttpServletResponse response, @RequestBody AuthenticationRequest user) {
        AuthenticationResponse loggedUser = authenticationService.loginUser(user);

        var cookie = new Cookie("token", loggedUser.getToken());

        cookie.setPath("/");
        cookie.setMaxAge(4320); //1h 20min
        response.addCookie(cookie);
        return ResponseEntity.ok(loggedUser);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<AuthenticationResponse> registerUserCredential2(@RequestBody AuthenticationRequest user) {
        AuthenticationResponse registeredUser = authenticationService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDetailsResponse>> getAllUsers() {
        List<UserDetailsResponse> response = authenticationService.getAllUsers();
        return ResponseEntity.ok(response);
    }
}
