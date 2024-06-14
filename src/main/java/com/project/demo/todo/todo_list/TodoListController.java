package com.project.demo.todo.todo_list;

import com.project.demo.todo.todo_item.TodoItem;
import com.project.demo.todo.todo_item.TodoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/todolist")
public class TodoListController {

    private final TodoListService service;

    private final TodoItemService itemService;

    @Autowired
    public TodoListController(TodoListService service, TodoItemService itemService) {
        this.service = service;
        this.itemService = itemService;
    }

    @GetMapping(path = "/")
    public Iterable<TodoList> getAllTodoLists() {
        return service.getAllTodoLists();
    }

    @GetMapping(path = "/{id}")
    public TodoList getTodoListById(@PathVariable Long id) {
        return service.getTodoListById(id);
    }

    @PostMapping(path = "/")
    public TodoList createTodoList(@RequestBody TodoList todoList) {
        return service.createTodoList(todoList);
    }

    @PutMapping(path = "/")
    public TodoList updateTodoList(@RequestBody TodoList todoList) {
        return service.updateTodoList(todoList);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteTodoListById(@PathVariable Long id) {
        Iterable<TodoItem> list = itemService.getTodoItemsByTodoListId(id);
        List<TodoItem> items = new ArrayList<>();
        list.iterator().forEachRemaining(items::add);

        for (TodoItem item : items) {
            itemService.deleteTodoItemById(item.getId());
        }

        service.deleteTodoListById(id);
    }

    @MessageMapping("/ws/add")
    @SendTo("/ws/add")
    public TodoList addTodoList(@RequestBody TodoList todoList) {
        return service.createTodoList(todoList);
    }

    @ExceptionHandler
    public String handleException(Exception e) {
        return e.getMessage();
    }
}
