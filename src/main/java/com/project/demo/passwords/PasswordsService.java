package com.project.demo.passwords;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordsService {

    private final PasswordRepository passwordRepository;

    @Autowired
    public PasswordsService(PasswordRepository passwordRepository) {
        this.passwordRepository = passwordRepository;
    }

    public List<Passwords> getAllPasswords() {
        return passwordRepository.findAll();
    }

    public Passwords getPasswordById(Long id) {
        Optional<Passwords> password = passwordRepository.findById(id);

        if (password.isEmpty()) {
            throw new IllegalStateException(
                    "There is no password with id " + id
            );
        }

        return password.get();
    }

    public void deletePassword(Long id) {
        Optional<Passwords> passwordsOptional = passwordRepository.findById(id);

        if (passwordsOptional.isEmpty()) {
            throw new IllegalStateException(
                    "There is no password with id " + id
            );
        }

        passwordRepository.deleteById(id);
    }

    public Passwords createPassword(Passwords passwords) {
        Optional<Passwords> passwordOptional = passwordRepository.findById(passwords.getId());

        if (passwordOptional.isPresent()) {
            throw new IllegalStateException(
                    "There is already a password with this id."
            );
        }

        return passwordRepository.save(passwords);
    }

    public Passwords updatePassword(Passwords passwords) {
        return passwordRepository.save(passwords);
    }
}
