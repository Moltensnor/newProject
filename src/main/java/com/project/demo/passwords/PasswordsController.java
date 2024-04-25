package com.project.demo.passwords;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/passwords")
public class PasswordsController {

    private final PasswordsService passwordsService;

    public PasswordsController(PasswordsService passwordsService) {
        this.passwordsService = passwordsService;
    }

    @GetMapping(path = "")
    public List<Passwords> getPasswords() {
        return passwordsService.getAllPasswords();
    }

    @GetMapping(path = "id/{id}")
    public Passwords getPasswordsById(@PathVariable UUID id) {
        return passwordsService.getPasswordById(id);
    }

    @PostMapping(path = "")
    public Passwords createPasswords(@RequestBody Passwords passwords) {
        return passwordsService.createPassword(passwords);
    }

    @PutMapping(path = "")
    public Passwords updatePasswords(@RequestBody Passwords passwords) {
        return passwordsService.updatePassword(passwords);
    }

    @DeleteMapping(path = "id/{id}")
    public void deletePasswordsById(@PathVariable UUID id) {
        passwordsService.deletePassword(id);
    }
}
