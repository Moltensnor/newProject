package com.project.demo.importance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImportanceService {

    private final ImportanceRepository importanceRepository;

    @Autowired
    public ImportanceService(ImportanceRepository importanceRepository) {
        this.importanceRepository = importanceRepository;
    }

    public List<Importance> getAllImportance() {
        List<Importance> importanceList = importanceRepository.findAll();

        if (importanceList.isEmpty()) {
            throw new IllegalStateException("There is no importance in the database");
        }

        return importanceList;
    }

    public Importance addImportance(Importance importance) {
        return importanceRepository.save(importance);
    }

    public Importance getImportanceByWeightAndLevel(int weight, int level) {
        Optional<Importance> optionalImportance = importanceRepository.findByWeightAndImportanceLevels(weight, level);

        if (optionalImportance.isEmpty()) {
            throw new IllegalStateException("There is no importance in the database.");
        }

        return optionalImportance.get();
    }
}
