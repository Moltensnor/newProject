package com.project.demo.TODO;

import com.project.demo.importance.Importance;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import org.apache.logging.log4j.util.PropertySource;

import java.util.Comparator;

@Entity
public class TODO implements Comparable<TODO>{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String username;

    private String name;

    private String description;

    @ManyToOne
    private Importance importance;

    public TODO() {
    }

    public TODO(Long id, String username, String name, String description, Importance importance) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.description = description;
        this.importance = importance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Importance getImportance() {
        return importance;
    }

    public void setImportance(Importance importance) {
        this.importance = importance;
    }

    @Override
    public int compareTo(TODO o) {
        return Comparator.comparing(TODO::getImportance)
                .compare(this, o);
    }
}
