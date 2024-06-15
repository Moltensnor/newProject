package com.project.demo.costcalculator.cost_item;

import com.project.demo.costcalculator.cost_group.CostGroup;
import com.project.demo.costcalculator.cost_list.CostList;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Objects;

@Entity
public class CostItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Long amount;

    @ManyToOne
    @JoinColumn(name = "costgroup_id", nullable = false)
    private CostGroup costGroup;

    @ManyToOne
    @JoinColumn(name = "costlist_id", nullable = false)
    private CostList costList;

    public CostItem() {
    }

    public CostItem(Long id, String name, String description, Long amount, CostGroup costGroup, CostList costList) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.costGroup = costGroup;
        this.costList = costList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public CostGroup getCostGroup() {
        return costGroup;
    }

    public void setCostGroup(CostGroup costGroup) {
        this.costGroup = costGroup;
    }

    public CostList getCostList() {
        return costList;
    }

    public void setCostList(CostList costList) {
        this.costList = costList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CostItem costItem = (CostItem) o;
        return Objects.equals(id, costItem.id) && Objects.equals(name, costItem.name) && Objects.equals(description, costItem.description) && Objects.equals(amount, costItem.amount) && Objects.equals(costGroup, costItem.costGroup) && Objects.equals(costList, costItem.costList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, amount, costGroup, costList);
    }

    @Override
    public String toString() {
        return "CostItem{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", costGroup=" + costGroup +
                ", costList=" + costList +
                '}';
    }
}
