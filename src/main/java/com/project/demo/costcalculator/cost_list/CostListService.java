package com.project.demo.costcalculator.cost_list;

import com.project.demo.costcalculator.cost_group.CostGroup;
import com.project.demo.costcalculator.cost_group.CostGroupService;
import com.project.demo.costcalculator.cost_item.CostItem;
import com.project.demo.costcalculator.cost_item.CostItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class CostListService {

    private final CostListRepository repository;

    private final CostGroupService costGroupService;

    private final CostItemService costItemService;

    @Autowired
    public CostListService(CostListRepository repository, CostGroupService costGroupService, CostItemService costItemService) {
        this.repository = repository;
        this.costGroupService = costGroupService;
        this.costItemService = costItemService;
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
        Iterable<CostItem> costItems = costItemService.findByCostListId(id);
        Iterable<CostGroup> costGroups = costGroupService.findByCostListId(id);

        costItems.forEach(costItem -> costItemService.deleteById(costItem.getId()));
        costGroups.forEach(costGroup -> costGroupService.deleteById(costGroup.getId()));

        repository.deleteById(id);
    }

    public Iterable<Pair<CostGroup, Pair<Long, Double>>> countTotalCostPerGroupById(Long id) {
        Iterable<CostGroup> costGroups = costGroupService.findByCostListId(id);
        List<Pair<CostGroup, Pair<Long, Double>>> result = new ArrayList<>();
        Long listTotal = countTotalCostById(id);

        costGroups.forEach(
                costGroup -> {
                    AtomicReference<Long> totalCost = new AtomicReference<>(0L);
                    Iterable<CostItem> costItems = costItemService.findByCostGroupId(costGroup.getId());

                    costItems.forEach(item -> totalCost.updateAndGet(v -> v + item.getAmount()));
                    Double totalPercentage = (double) Math.round((Double.valueOf(totalCost.get()) / listTotal) * 100);
                    result.add(Pair.of(costGroup, Pair.of(totalCost.get(), totalPercentage)));
                }
        );

        return result;
    }

    public Long countTotalCostById(Long id) {
        Iterable<CostItem> costItems = costItemService.findByCostListId(id);
        AtomicReference<Long> totalCost = new AtomicReference<>(0L);
        costItems.forEach(item -> totalCost.updateAndGet(v -> v + item.getAmount()));
        return totalCost.get();
    }

    public Iterable<Pair<CostGroup, Pair<Long, Pair<Double, Double>>>> countTotalCostWithBudgetByGroupId(Long id) {
        CostList list = findById(id);
        Iterable<CostGroup> costGroups = costGroupService.findByCostListId(id);
        List<Pair<CostGroup, Pair<Long, Pair<Double, Double>>>> result = new ArrayList<>();
        Long listTotal = countTotalCostById(id);

        costGroups.forEach(
                costGroup -> {
                    AtomicReference<Long> totalCost = new AtomicReference<>(0L);
                    Iterable<CostItem> costItems = costItemService.findByCostGroupId(costGroup.getId());

                    costItems.forEach(item -> totalCost.updateAndGet(v -> v + item.getAmount()));
                    Double totalPercentage = (double) Math.round((Double.valueOf(totalCost.get()) / listTotal) * 100);
                    Double budgetPercentage = (double) Math.round((Double.valueOf(totalCost.get()) / list.getBudget()) * 100);
                    result.add(Pair.of(costGroup, Pair.of(totalCost.get(), Pair.of(totalPercentage, budgetPercentage))));
                }
        );

        return result;
    }

    public Iterable<Pair<CostItem, Double>> countTotalItems(Long id) {
        Iterable<CostItem> costItems = costItemService.findByCostListId(id);
        List<Pair<CostItem, Double>> result = new ArrayList<>();
        Long listTotal = countTotalCostById(id);

        costItems.forEach(
                costItem -> {
                    Double temp = ((double) costItem.getAmount() / listTotal);
                    Double totalPercentage = (double) Math.round(temp * 100);
                    result.add(Pair.of(costItem, totalPercentage));
                }
        );

        return result;
    }

    public Iterable<Pair<CostItem, Pair<Double, Double>>> countTotalItemsWithBudget(Long id) {
        CostList list = findById(id);
        Iterable<CostItem> costItems = costItemService.findAll();
        List<Pair<CostItem, Pair<Double, Double>>> result = new ArrayList<>();
        Long listTotal = countTotalCostById(id);

        costItems.forEach(
                costItem -> {
                    Double totalBudgetPercentage = (double) Math.round((float) costItem.getAmount() / list.getBudget()) * 100;
                    Double totalPercentage = (double) Math.round((float) costItem.getAmount() / listTotal) * 100;
                    result.add(Pair.of(costItem, Pair.of(totalPercentage, totalBudgetPercentage)));
                }
        );

        return result;
    }
}
