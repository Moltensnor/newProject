package com.project.demo.TODO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/TODO")
public class TODOController {

    private final TODOService service;

    @Autowired
    public TODOController(TODOService service) {
        this.service = service;
    }

    @GetMapping("/unsorted")
    public List<TODO> getAllUnsorted() {
        return service.findAllUnsorted();
    }

    @GetMapping("/sorted")
    public List<TODO> getAllSorted() {
        return service.findAllSorted();
    }

    @GetMapping("/id/{id}")
    public TODO getTODOById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping("/")
    public TODO createTODO(TODO todo) {
        return service.addTodo(todo);
    }

    @PutMapping("/")
    public TODO updateTODO(TODO todo) {
        return service.editTODO(todo);
    }

    @DeleteMapping("/")
    public void deleteTODO(TODO todo) {
        service.deleteTODO(todo);
    }

    @ExceptionHandler(IllegalStateException.class)
    public String handleException(Exception e) {
        return e.getMessage();
    }
}
