package com.project.demo.todo.todo_item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/todoitem")
public class TodoItemController {

    private final TodoItemService todoItemService;

    @Autowired
    public TodoItemController(TodoItemService todoItemService) {
        this.todoItemService = todoItemService;
    }

    @GetMapping(path = "/")
    public Iterable<TodoItem> getTodoItems() {
        return todoItemService.getAllTodoItems();
    }

    @GetMapping(path = "/item/{id}")
    public TodoItem getTodoItemById(@PathVariable Long id) {
        return todoItemService.getTodoItemById(id);
    }

    @GetMapping(path = "/list/{id}")
    public Iterable<TodoItem> getTodoItemsByListId(@PathVariable Long id) {
        return todoItemService.getTodoItemsByTodoListId(id);
    }

    @PostMapping("/")
    public TodoItem createTodoItem(@RequestBody TodoItem todoItem) {
        return todoItemService.saveTodoItem(todoItem);
    }

    @DeleteMapping("/item/{id}")
    public void deleteTodoItemById(@PathVariable Long id) {
        todoItemService.deleteTodoItemById(id);
    }

    @ExceptionHandler
    public String handleException(Exception e) {
        return e.getMessage();
    }
}
