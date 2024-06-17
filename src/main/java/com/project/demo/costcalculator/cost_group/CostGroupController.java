package com.project.demo.costcalculator.cost_group;

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
@RequestMapping(path = "/api/v1/costgroup")
public class CostGroupController {

    private final CostGroupService service;

    @Autowired
    public CostGroupController(CostGroupService service) {
        this.service = service;
    }

    @GetMapping(path = "/")
    public Iterable<CostGroup> getAllCostGroups() {
        return service.findAll();
    }

    @GetMapping(path = "/group/{id}")
    public CostGroup getCostGroupById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping(path = "/list/{id}")
    public Iterable<CostGroup> getCostGroupsByListId(@PathVariable Long id) {
        return service.findByCostListId(id);
    }

    @PostMapping(path = "/")
    public CostGroup createCostGroup(@RequestBody CostGroup costGroup) {
        return service.save(costGroup);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteCostGroup(@PathVariable Long id) {
        service.deleteById(id);
    }

    @ExceptionHandler
    public ResponseEntity<String> handleException() {
        return ResponseEntity.badRequest().build();
    }
}
