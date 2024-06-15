package com.project.demo.costcalculator.cost_list;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CostListService {

    private final CostListRepository repository;

    @Autowired
    public CostListService(CostListRepository repository) {
        this.repository = repository;
    }

    public Iterable<CostList> findAll() {
        return repository.findAll();
    }

    public CostList save(CostList costList) {
        return repository.save(costList);
    }

    public CostList findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
