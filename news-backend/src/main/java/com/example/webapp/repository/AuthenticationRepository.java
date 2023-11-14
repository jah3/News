package com.example.webapp.repository;

import com.example.webapp.entity.Authentication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthenticationRepository extends JpaRepository<Authentication, Integer> {

    Optional<Authentication> findByUsernameAndPassword(String username, String password);

}