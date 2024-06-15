package com.project.demo.costcalculator.cost_group;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CostGroupService {

    private final CostGroupRepository repository;

    @Autowired
    public CostGroupService(CostGroupRepository repository) {
        this.repository = repository;
    }

    public Iterable<CostGroup> findAll() {
        return repository.findAll();
    }

    public CostGroup findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public CostGroup save(CostGroup costGroup) {
        return repository.save(costGroup);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Iterable<CostGroup> findByCostListId(Long costListId) {
        return repository.findByCostList_Id(costListId);
    }
}
