package com.project.demo.costcalculator.cost_list;

import com.project.demo.costcalculator.cost_group.CostGroup;
import com.project.demo.costcalculator.cost_item.CostItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
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
@RequestMapping(path = "/api/v1/costlist")
public class CostListController {

    private final CostListService service;

    @Autowired
    public CostListController(CostListService service) {
        this.service = service;
    }

    @GetMapping(path = "/")
    public Iterable<CostList> getAllCostList() {
        return service.findAll();
    }

    @GetMapping(path = "/{id}")
    public CostList getCostListById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping(path = "/")
    public CostList createCostList(@RequestBody CostList costList) {
        return service.save(costList);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteCostListById(@PathVariable Long id) {
        service.deleteById(id);
    }

    @GetMapping(path = "/countGroup/{id}")
    public Iterable<Pair<CostGroup, Pair<Long, Double>>> countTotalCostPerGroupById(@PathVariable Long id) {
        return service.countTotalCostPerGroupById(id);
    }

    @GetMapping(path = "/countTotalCost/{id}")
    public Long countTotalCostById(@PathVariable Long id) {
        return service.countTotalCostById(id);
    }

    @GetMapping(path = "/countTotalCost/budget/{id}")
    public Iterable<Pair<CostGroup, Pair<Long, Pair<Double, Double>>>> countTotalCostByBudget(@PathVariable Long id) {
        return service.countTotalCostWithBudgetByGroupId(id);
    }

    @GetMapping(path = "/countTotalItemsCost/{id}")
    public Iterable<Pair<CostItem, Double>> countTotalItems(@PathVariable Long id) {
        return service.countTotalItems(id);
    }
    @GetMapping(path = "/countTotalItemsCostBudget/{id}")
    public Iterable<Pair<CostItem, Pair<Double, Double>>> countTotalItemsWithBudget(@PathVariable Long id) {
        return service.countTotalItemsWithBudget(id);
    }

    @ExceptionHandler
    public ResponseEntity<String> handleException() {
        return ResponseEntity.badRequest().build();
    }
}
