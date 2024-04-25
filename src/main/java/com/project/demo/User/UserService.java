package com.project.demo.User;

import com.project.demo.passwords.Passwords;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * UserService class provides methods to interact with the UserRepository.
 * It handles the creation, retrieval, update, and deletion of users.
 *
 * @author Kevin Kruijthof
 * @version 1.0
 */
@Service
public class UserService {

    /**
     * UserRepository dependency for database operations.
     */
    private final UserRepository userRepository;

    /**
     * Constructor to initialize UserService with UserRepository.
     *
     * @param userRepository the UserRepository instance
     */
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Creates a new user in the database.
     *
     * @param user the User object to be created
     * @return the newly created User object
     * @throws IllegalStateException if a user with the same id already exists
     */
    public User createUser(User user) {
        List<User> usersOptional = userRepository.findUsersByEmail(user.getEmail());

        if (!usersOptional.isEmpty()) {
            throw new IllegalStateException(
                        "There is already a user with this email."
            );
        }
        return userRepository.save(user);
    }

    /**
     * Retrieves a user from the database by its id.
     *
     * @param id the id of the user to be retrieved
     * @return the User object with the specified id
     * @throws IllegalStateException if no user with the specified id exists
     */
    public User getUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new IllegalStateException(
                    "There is no user with this id."
            );
        }

        return optionalUser.get();
    }

    /**
     * Retrieves all users from the database with the specified username.
     *
     * @param username the username of the users to be retrieved
     * @return a list of User objects with the specified username
     * @throws IllegalStateException if no users with the specified username exist
     */
    public List<User> getUserByUsername(String username) {
        List<User> users = userRepository.findUsersByUsername(username);

        if (users.isEmpty()) {
            throw new IllegalStateException(
                    "There are no users with this username."
            );
        }

        return users;
    }

    /**
     * Retrieves all users from the database with the specified email.
     *
     * @param email the email of the users to be retrieved
     * @return a list of User objects with the specified email
     * @throws IllegalStateException if no users with the specified email exist
     */
    public List<User> getUserByEmail(String email) {
        List<User> users = userRepository.findUsersByEmail(email);

        if (users.isEmpty()) {
            throw new IllegalStateException(
                    "There are no users with this email."
            );
        }

        return users;
    }

    /**
     * Retrieves all users from the database.
     *
     * @return a list of all User objects in the database
     */
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Updates a user in the database.
     *
     * @param user the User object to be updated
     * @return the updated User object
     */
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Deletes a user from the database by its id.
     *
     * @param id the id of the user to be deleted
     * @throws IllegalStateException if no user with the specified id exists
     */
    public void deleteUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new IllegalStateException(
                    "There is no user with this id."
            );
        }

        userRepository.deleteById(id);
    }
}
