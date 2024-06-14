package com.project.demo.todo.todo_item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoItemService {

    private final TodoItemRepository todoItemRepository;

    @Autowired
    public TodoItemService(TodoItemRepository todoItemRepository) {
        this.todoItemRepository = todoItemRepository;
    }

    public Iterable<TodoItem> getAllTodoItems() {
        return todoItemRepository.findAll();
    }

    public TodoItem getTodoItemById(Long id) {
        return todoItemRepository.findById(id).get();
    }

    public TodoItem saveTodoItem(TodoItem todoItem) {
        return todoItemRepository.save(todoItem);
    }

    public void deleteTodoItemById(Long id) {
        todoItemRepository.deleteById(id);
    }

    public Iterable<TodoItem> getTodoItemsByTodoListId(Long todoListId) {
        return todoItemRepository.findByTodoList_Id(todoListId);
    }

    public Iterable<TodoItem> getTodoItemsByTodoListIdSorted(Long todoListId) {
        List<TodoItem> todoItemList = todoItemRepository.findByTodoList_Id(todoListId);
        TodoItemComparator todoItemComparator = new TodoItemComparator();


        todoItemList.sort(todoItemComparator);

        return  todoItemList;
    }
}
