package com.project.demo.importance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
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
    public List<Importance> getAll() {
        return importanceService.getAllImportance();
    }

    @PostMapping("/")
    public Importance createImportance(@RequestBody Importance importance) {
        return importanceService.addImportance(importance);
    }

    @ExceptionHandler
    public String handleException(Exception e) {
        return e.getMessage();
    }
}
