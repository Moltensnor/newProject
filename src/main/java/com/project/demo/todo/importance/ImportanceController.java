package com.project.demo.todo.importance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/importance")
public class ImportanceController {

    private final ImportanceService importanceService;

    @Autowired
    public ImportanceController(ImportanceService importanceService) {
        this.importanceService = importanceService;
    }

    @GetMapping("/")
    public Iterable<Importance> getAll() {
        return importanceService.getAllImportance();
    }

    @PostMapping("/")
    public Importance createImportance(@RequestBody Importance importance) {
        return importanceService.addImportance(importance);
    }

    @GetMapping("/{weight}/{level}")
    public Importance getImportanceByWeightAndLevel(@PathVariable int weight, @PathVariable int level) {
        return importanceService.getImportanceByWeightAndLevel(weight, level);
    }

    @ExceptionHandler
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.badRequest().build();
    }
}
