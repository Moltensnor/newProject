package com.project.demo.costcalculator.cost_group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CostGroupRepository extends JpaRepository<CostGroup, Long> {

    List<CostGroup> findByCostList_Id(Long id);
}
