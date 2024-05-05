package com.project.demo.passwords;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;
import java.util.UUID;

/**
 * Entity class representing a password entry.
 *
 * @author Tabnine
 */
@Entity
public class Passwords {

    /**
     * Unique identifier for the password entry.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    /**
     * Name of the website or service associated with the password.
     */
    private String name;

    /**
     * The actual password for the website or service.
     */
    private String password;

    /**
     * The website or service associated with the password.
     */
    private String website;

    private String username;

    /**
     * Getter for the associated User object.
     *
     * @return The associated User object.
     */
    public String getUser() {
        return username;
    }

    /**
     * Setter for the associated User object.
     *
     * @param user The User object to be associated with this password entry.
     */
    public void setUser(String user) {
        this.username = user;
    }

    /**
     * Constructor for creating a new password entry.
     *
     * @param id          Unique identifier for the password entry.
     * @param name        Name of the website or service associated with the password.
     * @param password    The actual password for the website or service.
     * @param website     The website or service associated with the password.
     */
    public Passwords(Long id, String name, String password, String website, String username) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.website = website;
        this.username = username;
    }

    /**
     * Default constructor for creating a new password entry.
     */
    public Passwords() {

    }

    /**
     * Getter for the unique identifier of the password entry.
     *
     * @return The unique identifier of the password entry.
     */
    public Long getId() {
        return id;
    }

    /**
     * Setter for the unique identifier of the password entry.
     *
     * @param id The unique identifier of the password entry to be set.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Getter for the name of the website or service associated with the password.
     *
     * @return The name of the website or service associated with the password.
     */
    public String getName() {
        return name;
    }

    /**
     * Setter for the name of the website or service associated with the password.
     *
     * @param name The name of the website or service associated with the password to be set.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter for the actual password for the website or service.
     *
     * @return The actual password for the website or service.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Setter for the actual password for the website or service.
     *
     * @param password The actual password for the website or service to be set.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Getter for the website or service associated with the password.
     *
     * @return The website or service associated with the password.
     */
    public String getWebsite() {
        return website;
    }

    /**
     * Setter for the website or service associated with the password.
     *
     * @param website The website or service associated with the password to be set.
     */
    public void setWebsite(String website) {
        this.website = website;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Checks if the given object is equal to this password entry.
     *
     * @param o The object to compare with this password entry.
     * @return True if the given object is equal to this password entry, false otherwise.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Passwords passwords = (Passwords) o;
        return Objects.equals(id, passwords.id) && Objects.equals(name, passwords.name) && Objects.equals(password, passwords.password) && Objects.equals(website, passwords.website);
    }

    /**
     * Calculates the hash code for this password entry.
     *
     * @return The hash code for this password entry.
     */
    @Override
    public int hashCode() {
        return Objects.hash(id, name, password, website);
    }
}
