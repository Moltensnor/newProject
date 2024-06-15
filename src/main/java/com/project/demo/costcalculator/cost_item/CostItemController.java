package com.project.demo.costcalculator.cost_item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/costitem")
public class CostItemController {

    private final CostItemService service;

    @Autowired
    public CostItemController(CostItemService service) {
        this.service = service;
    }

    @GetMapping(path = "/")
    public Iterable<CostItem> getAllCostItems() {
        return service.findAll();
    }

    @GetMapping(path = "/item/{id}")
    public CostItem getCostItemById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping(path = "/group/{id}")
    public Iterable<CostItem> getCostItemsByGroupId(@PathVariable Long id) {
        return service.findByCostGroupId(id);
    }

    @GetMapping(path = "/list/{id}")
    public Iterable<CostItem> getCostItemsByListId(@PathVariable Long id) {
        return service.findByCostListId(id);
    }

    @PostMapping(path = "/")
    public CostItem createCostItem(@RequestBody CostItem costItem) {
        return service.save(costItem);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteCostItem(@PathVariable Long id) {
        service.deleteById(id);
    }

    @ExceptionHandler
    public ResponseEntity<String> handleException() {
        return ResponseEntity.badRequest().build();
    }
}
