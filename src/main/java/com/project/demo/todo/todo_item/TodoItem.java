package com.project.demo.todo.todo_item;

import com.project.demo.todo.importance.Importance;
import com.project.demo.todo.todo_list.TodoList;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Objects;

/**
 * Entity representing a TodoItem.
 *
 * @author Tabnine
 */
@Entity
public class TodoItem {

    /**
     * The primary key of the TodoItem.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    /**
     * The name of the TodoItem.
     */
    private String name;

    /**
     * The description of the TodoItem.
     */
    private String description;

    private boolean isComplete;

    /**
     * The Importance of the TodoItem.
     */
    @ManyToOne
    @JoinColumn(name = "importance_id", nullable = false)
    private Importance importance;

    /**
     * The TodoList to which the TodoItem belongs.
     */
    @ManyToOne
    @JoinColumn(name = "todo_list_id", nullable = false)
    private TodoList todoList;

    /**
     * Default constructor for TodoItem.
     */
    public TodoItem() {
    }

    /**
     * Constructor for TodoItem with all fields.
     *
     * @param id          the primary key of the TodoItem
     * @param name        the name of the TodoItem
     * @param description the description of the TodoItem
     * @param isComplete  whether the TodoItem is complete
     * @param importance  the Importance of the TodoItem
     * @param todoList     the TodoList to which the TodoItem belongs
     */
    public TodoItem(Long id, String name, String description, boolean isComplete, Importance importance, TodoList todoList) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isComplete = isComplete;
        this.importance = importance;
        this.todoList = todoList;
    }

    /**
     * Get the primary key of the TodoItem.
     *
     * @return the primary key of the TodoItem
     */
    public Long getId() {
        return id;
    }

    /**
     * Set the primary key of the TodoItem.
     *
     * @param id the primary key of the TodoItem
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Get the name of the TodoItem.
     *
     * @return the name of the TodoItem
     */
    public String getName() {
        return name;
    }

    /**
     * Set the name of the TodoItem.
     *
     * @param name the name of the TodoItem
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get the description of the TodoItem.
     *
     * @return the description of the TodoItem
     */
    public String getDescription() {
        return description;
    }

    /**
     * Set the description of the TodoItem.
     *
     * @param description the description of the TodoItem
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Get the Importance of the TodoItem.
     *
     * @return the Importance of the TodoItem
     */
    public Importance getImportance() {
        return importance;
    }

    /**
     * Set the Importance of the TodoItem.
     *
     * @param importance the Importance of the TodoItem
     */
    public void setImportance(Importance importance) {
        this.importance = importance;
    }

    /**
     * Get the TodoList to which the TodoItem belongs.
     *
     * @return the TodoList to which the TodoItem belongs
     */
    public TodoList getTodoList() {
        return todoList;
    }

    /**
     * Set the TodoList to which the TodoItem belongs.
     *
     * @param todoList the TodoList to which the TodoItem belongs
     */
    public void setTodoList(TodoList todoList) {
        this.todoList = todoList;
    }

    /**
     * Check if the TodoItem is complete.
     *
     * @return true if the TodoItem is complete, false otherwise
     */
    public boolean isComplete() {
        return isComplete;
    }

    /**
     * Set the completion status of the TodoItem.
     *
     * @param complete true if the TodoItem is complete, false otherwise
     */
    public void setComplete(boolean complete) {
        isComplete = complete;
    }

    /**
     * Checks if the given object is equal to this TodoItem.
     *
     * @param o the object to compare with
     * @return true if the given object is equal to this TodoItem, false otherwise
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TodoItem todoItem = (TodoItem) o;
        return isComplete == todoItem.isComplete && Objects.equals(id, todoItem.id) && Objects.equals(name, todoItem.name) && Objects.equals(description, todoItem.description) && Objects.equals(importance, todoItem.importance) && Objects.equals(todoList, todoItem.todoList);
    }

    /**
     * Calculates the hash code for this TodoItem.
     *
     * @return the hash code for this TodoItem
     */
    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, isComplete, importance, todoList);
    }

    /**
     * Returns a string representation of this TodoItem.
     *
     * @return a string representation of this TodoItem
     */
    @Override
    public String toString() {
        return "TodoItem{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", isComplete=" + isComplete +
                ", importance=" + importance +
                ", todoList=" + todoList +
                '}';
    }
}
