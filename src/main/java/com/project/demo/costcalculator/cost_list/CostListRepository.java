package com.project.demo.costcalculator.cost_list;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CostListRepository extends JpaRepository<CostList, Long> {
}
