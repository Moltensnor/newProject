package com.project.demo.TODO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TODORepository extends JpaRepository<TODO, Long> {


    @Override
    Optional<TODO> findById(Long aLong);
}
