package com.project.demo.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for Role entity.
 * Provides methods to interact with the Role table in the database.
 *
 * @author Tabnine
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

    /**
     * Finds a Role by its name.
     *
     * @param name The name of the Role to find.
     * @return The Role with the given name, or null if not found.
     */
    Optional<Role> findByName(String name);
}
