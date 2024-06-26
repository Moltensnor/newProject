package com.project.demo.todo.todo_item;

import java.util.Comparator;

public class TodoItemComparator implements Comparator<TodoItem> {

    @Override
    public int compare(TodoItem o1, TodoItem o2) {
        return o2.getImportance().compareTo(o1.getImportance());
    }
}
