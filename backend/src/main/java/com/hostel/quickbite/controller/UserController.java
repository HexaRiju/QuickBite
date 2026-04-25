package com.hostel.quickbite.controller;

import com.hostel.quickbite.model.User;
import com.hostel.quickbite.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    //  GET ALL USERS
    @GetMapping
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    //  LOGIN
    @GetMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam String rollNo,
            @RequestParam String password
    ) {
        Optional<User> user = repo.findById(rollNo);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    //  SIGNUP
    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody User user) {

        if (repo.existsById(user.getRollNo())) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        return ResponseEntity.ok(repo.save(user));
    }
}