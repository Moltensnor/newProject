package com.project.demo.todo.todo_item;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {


    List<TodoItem> findByTodoList_Id(Long id);
}
