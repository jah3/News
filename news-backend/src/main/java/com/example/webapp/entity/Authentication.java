package com.example.webapp.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@Entity
@Table(name = "authentication")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Authentication {

    @Id
    @Column(name = "login_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    BigInteger id;

    @Column(name = "username")
    String username;

    @Column(name = "password")
    String password;

    public Authentication(String username, String password) {
        this.username = username;
        this.password = password;
    }
}