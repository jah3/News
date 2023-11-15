package com.example.webapp.service;

import com.example.webapp.dto.AuthenticationRequest;
import com.example.webapp.dto.AuthenticationResponse;
import com.example.webapp.dto.UserDetailsResponse;
import com.example.webapp.entity.Authentication;
import com.example.webapp.exception.authentication.AlreadyRegisteredException;
import com.example.webapp.repository.AuthenticationRepository;
import com.example.webapp.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationRepository authenticationRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;


    public AuthenticationResponse loginUser(AuthenticationRequest user) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );

        var userFound = authenticationRepository.findByUsername(user.getUsername());
        if (userFound.isEmpty()) {
            throw new AlreadyRegisteredException("This user does not exists");
        }
        //authenticationRepository.save(new Authentication(user.getUsername(), user.getPassword()));
        return new AuthenticationResponse(userFound.get().getUsername(), jwtService.generateToken(userFound.get()));
    }

    public AuthenticationResponse registerUser(AuthenticationRequest user) {

        var userFound = authenticationRepository.findByUsername(user.getUsername());

        if (userFound.isPresent()) {
            throw new AlreadyRegisteredException("User already exists");
        }

        var userEntity = authenticationRepository.save(Authentication.builder()
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                //.role(user.getRole())
                .role("member")
                .email(user.getEmail())
                .build());
        return new AuthenticationResponse(userEntity.getUsername(), jwtService.generateToken(userEntity));
    }

    public List<UserDetailsResponse> getAllUsers() {
        List<Authentication> users = authenticationRepository.findAll();
        return users.stream()
                .map(user -> new UserDetailsResponse(user.getUsername(), user.getEmail(), user.getRole()))
                .collect(Collectors.toList());
    }
}
