package com.project.demo.costcalculator.cost_item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CostItemRepository extends JpaRepository<CostItem, Long> {

    List<CostItem> findByCostGroup_Id(Long id);

    List<CostItem> findByCostList_Id(Long id);

}
