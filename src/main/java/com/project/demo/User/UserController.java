package com.project.demo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * UserController class is a RESTful controller that handles HTTP requests related to users.
 * It uses the Spring MVC framework and is annotated with @RestController annotation.
 * The base URL for this controller is "/api/v1/users".
 *
 * @author Tabnine
 */
@RestController("/api/v1/users")
public class UserController {

    private final UserService userService;

    /**
     * UserService dependency is injected through the constructor.
     * It is used to perform operations on users.
     *
     * @param userService The UserService instance to be used.
     */
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * This method returns all users.
     * It uses the getAllUsers method of the UserService instance.
     *
     * @return An Iterable of User objects.
     */
    @GetMapping(path = "/")
    public Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * This method returns a specific user by its id.
     * It uses the getUser method of the UserService instance.
     *
     * @param id The id of the user to be retrieved.
     * @return A User object.
     */
    @GetMapping(path = "/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUser(id);
    }

    /**
     * This method returns a list of users by their username.
     * It uses the getUserByUsername method of the UserService instance.
     *
     * @param username The username of the user to be retrieved.
     * @return A list of User objects.
     */
    @GetMapping(path = "/{username}")
    public List<User> getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    /**
     * This method returns a list of users by their email.
     * It uses the getUserByEmail method of the UserService instance.
     *
     * @param email The email of the user to be retrieved.
     * @return A list of User objects.
     */
    @GetMapping(path = "/{email}")
    public List<User> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    /**
     * This method creates a new user.
     * It uses the createUser method of the UserService instance.
     *
     * @param user The User object to be created.
     * @return A User object.
     */
    @PostMapping(path = "/")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    /**
     * This method handles exceptions of type IllegalStateException.
     * It returns a bad request response.
     *
     * @return A ResponseEntity with a bad request status.
     */
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<User> exceptionHandler() {
        return ResponseEntity.badRequest().build();
    }
}
