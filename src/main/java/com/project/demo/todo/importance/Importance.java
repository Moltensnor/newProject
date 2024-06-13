package com.project.demo.todo.importance;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Comparator;

@Entity
public class Importance implements Comparable<Importance> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private int weight;

    private int importanceLevels;

    public Importance() {
    }

    public Importance(Long id, int weight, int importanceLevels) {
        this.id = id;
        this.weight = weight;
        this.importanceLevels = importanceLevels;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getImportanceLevels() {
        return importanceLevels;
    }

    public void setImportanceLevels(int importanceLevels) {
        this.importanceLevels = importanceLevels;
    }

    @Override
    public int compareTo(Importance o) {
        return Comparator.comparing(Importance::getImportanceLevels)
                .thenComparing(Importance::getWeight)
                .compare(this, o);
    }
}
