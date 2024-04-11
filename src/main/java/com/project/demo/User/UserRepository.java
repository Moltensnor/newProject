package com.project.demo.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * This interface is used to interact with the database and perform operations on the User table.
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {

    /**
     * This method is used to find a user based on their email address.
     *
     * @param email The email address of the user
     * @return A list of users with the specified email address
     */
    List<User> findUsersByEmail(String email);

    /**
     * This method is used to find a user based on their username.
     *
     * @param username The username of the user
     * @return A list of users with the specified username
     */
    List<User> findUsersByUsername(String username);
}
