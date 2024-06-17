package com.project.demo.costcalculator.cost_group;

import com.project.demo.costcalculator.cost_list.CostList;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Objects;

@Entity
public class CostGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String hexcode;

    private Long budget;

    @ManyToOne
    @JoinColumn(name = "CostList_id", nullable = false)
    private CostList costList;

    public CostGroup() {
    }

    public CostGroup(Long id, String name, String hexcode, Long budget, CostList costList) {
        this.id = id;
        this.name = name;
        this.hexcode = hexcode;
        this.budget = budget;
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

    public String getHexcode() {
        return hexcode;
    }

    public void setHexcode(String hexcode) {
        this.hexcode = hexcode;
    }

    public Long getBudget() {
        return budget;
    }

    public void setBudget(Long budget) {
        this.budget = budget;
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
        CostGroup costGroup = (CostGroup) o;
        return Objects.equals(id, costGroup.id) && Objects.equals(name, costGroup.name) && Objects.equals(hexcode, costGroup.hexcode) && Objects.equals(budget, costGroup.budget) && Objects.equals(costList, costGroup.costList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, hexcode, budget, costList);
    }

    @Override
    public String toString() {
        return "Cost_Group{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", hexcode='" + hexcode + '\'' +
                ", budget=" + budget +
                ", costList=" + costList +
                '}';
    }
}
