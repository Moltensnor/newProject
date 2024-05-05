package com.project.demo.TODO;

import com.project.demo.importance.Importance;
import com.project.demo.importance.ImportanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TODOService {

    private final TODORepository repository;

    private final ImportanceService importanceService;

    @Autowired
    public TODOService(TODORepository repository, ImportanceService importanceService) {
        this.repository = repository;
        this.importanceService = importanceService;
    }

    public List<TODO> findAllUnsorted() {
        List<TODO> todos = repository.findAll();

        if (todos.isEmpty()) {
            throw new IllegalStateException("There is no list of tasks");
        }

        return todos;
    }

    public List<TODO> findAllSorted() {
        List<TODO> todos = repository.findAll();

        if (todos.isEmpty()) {
            throw new IllegalStateException("There is no list of tasks");
        }

        Collections.sort(todos);

        return todos;
    }

    public TODO addTodo(TODO todo) {
        Importance importance = todo.getImportance();

        try {
            Importance newImportance = importanceService
                    .getImportanceByWeightAndLevel(
                            importance.getWeight(),
                            importance.getImportanceLevels());
            todo.setImportance(newImportance);
        } catch (Exception e) {
            importanceService.addImportance(importance);
        }

        return repository.save(todo);
    }

    public TODO editTODO(TODO todo) {
        Optional<TODO> optionalTODO = repository.findById(todo.getId());

        if (optionalTODO.isEmpty()) {
            throw new IllegalStateException("There is no task with id: " + todo.getId());
        }

        Importance importance = todo.getImportance();

        try {
            Importance newImportance = importanceService
                    .getImportanceByWeightAndLevel(
                            importance.getWeight(),
                            importance.getImportanceLevels());
            todo.setImportance(newImportance);
        } catch (Exception e) {
            importanceService.addImportance(importance);
        }

        return repository.save(todo);
    }

    public void deleteTODO(TODO todo) {
        Optional<TODO> optionalTODO = repository.findById(todo.getId());

        if (optionalTODO.isEmpty()) {
            throw new IllegalStateException("There is no task with id: " + todo.getId());
        }

        repository.delete(todo);
    }

    public TODO findById(Long id) {
        Optional<TODO> optionalTODO = repository.findById(id);

        if (optionalTODO.isEmpty()) {
            throw new IllegalStateException("There is no task with id: " + id);
        }

        return optionalTODO.get();
    }
}
