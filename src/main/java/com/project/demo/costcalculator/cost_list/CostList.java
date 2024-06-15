package com.project.demo.costcalculator.cost_list;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class CostList {

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

    private Long budget;

    public CostList() {
    }

    public CostList(Long id, String name, String date, String description, String userEmail, Long budget) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.description = description;
        this.userEmail = userEmail;
        this.budget = budget;
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

    public Long getBudget() {
        return budget;
    }

    public void setBudget(Long budget) {
        this.budget = budget;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CostList costList = (CostList) o;
        return Objects.equals(id, costList.id) && Objects.equals(name, costList.name) && Objects.equals(date, costList.date) && Objects.equals(description, costList.description) && Objects.equals(userEmail, costList.userEmail) && Objects.equals(budget, costList.budget);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, date, description, userEmail, budget);
    }

    @Override
    public String toString() {
        return "CostList{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date='" + date + '\'' +
                ", description='" + description + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", budget=" + budget +
                '}';
    }
}
