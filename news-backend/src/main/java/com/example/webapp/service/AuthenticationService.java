package com.example.webapp.service;

import com.example.webapp.dto.AuthenticationRequest;
import com.example.webapp.entity.Authentication;
import com.example.webapp.exception.authentication.AlreadyRegisteredException;
import com.example.webapp.repository.AuthenticationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationRepository authenticationRepository;


    public AuthenticationRequest registerUser(AuthenticationRequest user) {

        var userFound = authenticationRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (userFound.isEmpty()) {
            throw new AlreadyRegisteredException("This user does not exists! ");
        }
        //authenticationRepository.save(new Authentication(user.getUsername(), user.getPassword()));
        return user;
    }
}
