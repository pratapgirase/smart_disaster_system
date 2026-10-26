
package com.disaster.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.disaster.entity.User;
import com.disaster.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody Map<String, String> request) {
        try {
            User user = userService.registerUser(
                    request.get("fullName"),
                    request.get("email"),
                    request.get("password")
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of(
                            "message", "Registration successful!",
                            "id", user.getId(),
                            "fullName", user.getFullName(),
                            "email", user.getEmail()
                    )
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody Map<String, String> request) {
        try {
            User user = userService.loginUser(
                    request.get("email"),
                    request.get("password")
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Login successful!",
                            "id", user.getId(),
                            "fullName", user.getFullName(),
                            "email", user.getEmail()
                    )
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
