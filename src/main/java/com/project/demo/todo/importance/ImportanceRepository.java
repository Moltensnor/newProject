package com.project.demo.todo.importance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImportanceRepository extends JpaRepository<Importance, Long> {
    Optional<Importance> findByWeightAndImportanceLevels(int weight, int importanceLevels);
}
