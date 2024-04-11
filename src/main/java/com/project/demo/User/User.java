package com.project.demo.User;

import com.project.demo.Role.Role;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.UuidGenerator;

/**
 * Entity class for Users
 */
@Entity
@Table(name = "users")
public class User {

    /**
     * Unique identifier for the user
     */
    @Id
    @UuidGenerator
    private String id;

    /**
     * Username of the user
     */
    private String username;

    /**
     * Password of the user
     */
    private String password;

    /**
     * Email of the user
     */
    private String email;

    /**
     * Whether the user is enabled or not
     */
    private Boolean enabled;

    /**
     * Role of the user
     */
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id")
    private Role role;

    /**
     * Default constructor
     */
    public User() {
    }

    /**
     * Constructor with all fields
     *
     * @param id       unique identifier for the user
     * @param username username of the user
     * @param password password of the user
     * @param email    email of the user
     * @param enabled  whether the user is enabled or not
     * @param role     role of the user
     */
    public User(String id, String username, String password, String email, Boolean enabled, Role role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.enabled = enabled;
        this.role = role;
    }

    /**
     * Getter for the unique identifier of the user
     *
     * @return unique identifier of the user
     */
    public String getId() {
        return id;
    }

    /**
     * Setter for the unique identifier of the user
     *
     * @param id unique identifier of the user
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Getter for the username of the user
     *
     * @return username of the user
     */
    public String getUsername() {
        return username;
    }

    /**
     * Setter for the username of the user
     *
     * @param username username of the user
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Getter for the password of the user
     *
     * @return password of the user
     */
    public String getPassword() {
        return password;
    }

    /**
     * Setter for the password of the user
     *
     * @param password password of the user
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Getter for the email of the user
     *
     * @return email of the user
     */
    public String getEmail() {
        return email;
    }

    /**
     * Setter for the email of the user
     *
     * @param email email of the user
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Getter for whether the user is enabled or not
     *
     * @return whether the user is enabled or not
     */
    public Boolean getEnabled() {
        return enabled;
    }

    /**
     * Setter for whether the user is enabled or not
     *
     * @param enabled whether the user is enabled or not
     */
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    /**
     * Getter for the role of the user
     *
     * @return role of the user
     */
    public Role getRole() {
        return role;
    }

    /**
     * Setter for the role of the user
     *
     * @param role role of the user
     */
    public void setRole(Role role) {
        this.role = role;
    }

}
