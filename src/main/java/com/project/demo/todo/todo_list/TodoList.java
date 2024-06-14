package com.project.demo.todo.todo_list;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;


/**
 * Entity class representing a TodoList.
 *
 * @author Tabnine
 */
@Entity
public class TodoList {

    /**
     * Generated unique identifier for the TodoList.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    /**
     * Name of the TodoList.
     */
    private String name;

    /**
     * Date of the TodoList.
     */
    private String date;

    /**
     * Description of the TodoList.
     */
    private String description;

    /**
     * Email of the user who created the TodoList.
     */
    private String userEmail;

    /**
     * Default constructor for TodoList.
     */
    public TodoList() {
    }

    /**
     * Constructor for TodoList with all fields.
     *
     * @param id          Unique identifier for the TodoList
     * @param name        Name of the TodoList
     * @param date        Date of the TodoList
     * @param description Description of the TodoList
     * @param userEmail   Email of the user who created the TodoList
     */
    public TodoList(Long id, String name, String date, String description, String userEmail) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.description = description;
        this.userEmail = userEmail;
    }

    /**
     * Get the unique identifier for the TodoList.
     *
     * @return The unique identifier for the TodoList
     */
    public Long getId() {
        return id;
    }

    /**
     * Set the unique identifier for the TodoList.
     *
     * @param id The unique identifier for the TodoList
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Get the name of the TodoList.
     *
     * @return The name of the TodoList
     */
    public String getName() {
        return name;
    }

    /**
     * Set the name of the TodoList.
     *
     * @param name The name of the TodoList
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get the date of the TodoList.
     *
     * @return The date of the TodoList
     */
    public String getDate() {
        return date;
    }

    /**
     * Set the date of the TodoList.
     *
     * @param date The date of the TodoList
     */
    public void setDate(String date) {
        this.date = date;
    }

    /**
     * Get the description of the TodoList.
     *
     * @return The description of the TodoList
     */
    public String getDescription() {
        return description;
    }

    /**
     * Set the description of the TodoList.
     *
     * @param description The description of the TodoList
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Get the email of the user who created the TodoList.
     *
     * @return The email of the user who created the TodoList
     */
    public String getUserEmail() {
        return userEmail;
    }

    /**
     * Set the email of the user who created the TodoList.
     *
     * @param userEmail The email of the user who created the TodoList
     */
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    /**
     * Checks if the given object is equal to this TodoList.
     *
     * @param o The object to compare with this TodoList
     * @return True if the given object is equal to this TodoList, false otherwise
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TodoList todoList = (TodoList) o;
        return Objects.equals(id, todoList.id) && Objects.equals(name, todoList.name) && Objects.equals(date, todoList.date) && Objects.equals(description, todoList.description) && Objects.equals(userEmail, todoList.userEmail);
    }

    /**
     * Generates a hash code for this TodoList.
     *
     * @return The hash code for this TodoList
     */
    @Override
    public int hashCode() {
        return Objects.hash(id, name, date, description, userEmail);
    }

    /**
     * Returns a string representation of this TodoList.
     *
     * @return A string representation of this TodoList
     */
    @Override
    public String toString() {
        return "TODO_List{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date='" + date + '\'' +
                ", description='" + description + '\'' +
                ", userEmail='" + userEmail + '\'' +
                '}';
    }
}
