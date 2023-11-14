package com.example.webapp.entity;

import com.example.webapp.utility.ConvertJson;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Entity
@Table(name = "articles")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Articles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private BigInteger id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "publication_date")
    private LocalDateTime publicationDate;

    @Column(name = "images_json")
    private String imagesJson; // Stores the JSON representation of images

    @Transient // This field is ignored by JPA as it's not in the database
    private List<byte[]> images; // Used for logic in the application

    public void setImages(List<byte[]> images) {
        this.images = images;
        this.imagesJson = ConvertJson.imagesToJson(images);
    }

    public List<byte[]> getImages() {
        if (this.imagesJson != null && !this.imagesJson.isEmpty()) {
            this.images = ConvertJson.jsonToImages(this.imagesJson);
        }
        return this.images;
    }

    @PrePersist
    protected void onCreate() {
        publicationDate = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
    }
}
