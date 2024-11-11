package com.example.todobackend.controller;

import com.example.todobackend.exception.ResourceNotFoundException;
import com.example.todobackend.model.Todo;
import com.example.todobackend.model.User;
import com.example.todobackend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    @Transactional(readOnly = true)
    public List<Todo> getAllTodos(@AuthenticationPrincipal User user) {
        return todoRepository.findByUserId(user.getId());
    }

    @PostMapping
    @Transactional
    public Todo createTodo(@AuthenticationPrincipal User user, @RequestBody Todo todo) {
        todo.setUser(user);
        return todoRepository.save(todo);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<Todo> getTodoById(@AuthenticationPrincipal User user,
                                          @PathVariable(value = "id") Long todoId) {
        Todo todo = todoRepository.findByIdAndUserId(todoId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + todoId));
        return ResponseEntity.ok().body(todo);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Todo> updateTodo(@AuthenticationPrincipal User user,
                                         @PathVariable(value = "id") Long todoId,
                                         @RequestBody Todo todoDetails) {
        Todo todo = todoRepository.findByIdAndUserId(todoId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + todoId));

        todo.setTitle(todoDetails.getTitle());
        todo.setCompleted(todoDetails.isCompleted());
        final Todo updatedTodo = todoRepository.save(todo);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteTodo(@AuthenticationPrincipal User user,
                                         @PathVariable(value = "id") Long todoId) {
        Todo todo = todoRepository.findByIdAndUserId(todoId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + todoId));

        todoRepository.delete(todo);
        return ResponseEntity.noContent().build();
    }
}
