package com.project.demo.costcalculator.cost_item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CostItemService {

    private final CostItemRepository repository;

    @Autowired
    public CostItemService(CostItemRepository repository) {
        this.repository = repository;
    }

    public Iterable<CostItem> findAll() {
        return repository.findAll();
    }

    public CostItem findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public CostItem save(CostItem costItem) {
        return repository.save(costItem);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Iterable<CostItem> findByCostGroupId(Long costGroupId) {
        return repository.findByCostGroup_Id(costGroupId);
    }

    public Iterable<CostItem> findByCostListId(Long costListId) {
        return repository.findByCostList_Id(costListId);
    }
}
