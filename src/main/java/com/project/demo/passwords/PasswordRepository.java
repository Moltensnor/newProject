package com.project.demo.passwords;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PasswordRepository extends JpaRepository<Passwords, Long> {

    List<Passwords> findPasswordsByUsername(String username);
}
