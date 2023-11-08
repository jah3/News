package com.example.webapp.repository;

import com.example.webapp.entity.Articles;
import com.example.webapp.entity.Authentication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticlesRepository extends JpaRepository<Articles, Integer> {

    //    @Query(value = "SELECT * FROM Articles TOP 10 ", nativeQuery = true)
   // List<Articles> findByTitle(String title);
   //Optional<Articles> findByTitle(String title);

    Optional<Articles> findByTitle(String title);

}
