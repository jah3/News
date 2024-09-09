package com.example.webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class WebAppApplication {
    public static void main(String[] args) {
      SpringApplication.run(WebAppApplication.class, args);
    }
}
