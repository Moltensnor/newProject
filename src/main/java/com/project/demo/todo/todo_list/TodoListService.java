package com.project.demo.todo.todo_list;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing TodoLists.
 *
 * @author Tabnine
 */
@Service
public class TodoListService {

    /**
     * The TodoListRepository instance used to interact with the database.
     */
    private final TodoListRepository repository;

    /**
     * Constructor for TodoListService.
     *
     * @param repository The TodoListRepository instance to be used.
     */
    @Autowired
    public TodoListService(TodoListRepository repository) {
        this.repository = repository;
    }

    /**
     * Retrieves all TodoLists from the database.
     *
     * @return An Iterable of all TodoLists.
     */
    public Iterable<TodoList> getAllTodoLists() {
        return repository.findAll();
    }

    /**
     * Retrieves a specific TodoList by its ID.
     *
     * @param id The ID of the TodoList to be retrieved.
     * @return The TodoList with the specified ID, or null if not found.
     */
    public TodoList getTodoListById(Long id) {
        return repository.findById(id).orElse(null);
    }

    /**
     * Creates a new TodoList in the database.
     *
     * @param todoList The TodoList to be created.
     * @return The newly created TodoList.
     */
    public TodoList createTodoList(TodoList todoList) {
        return repository.save(todoList);
    }

    /**
     * Updates an existing TodoList in the database.
     *
     * @param todoList The updated TodoList.
     * @return The updated TodoList.
     */
    public TodoList updateTodoList(TodoList todoList) {
        return repository.save(todoList);
    }

    /**
     * Deletes a TodoList from the database by its ID.
     *
     * @param id The ID of the TodoList to be deleted.
     */
    public void deleteTodoListById(Long id) {
        repository.deleteById(id);
    }
}
