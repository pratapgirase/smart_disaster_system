
package com.disaster.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.disaster.entity.User;
import com.disaster.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(
            String fullName,
            String email,
            String password) {

        if (fullName == null || fullName.isBlank()
                || email == null || email.isBlank()
                || password == null || password.length() < 6) {
            throw new IllegalArgumentException(
                    "Please provide valid registration details. Password must be at least 6 characters.");
        }

        if (userRepository.existsByEmail(email.trim())) {
            throw new IllegalArgumentException(
                    "Email is already registered.");
        }

        User user = new User(
                fullName.trim(),
                email.trim().toLowerCase(),
                passwordEncoder.encode(password)
        );

        return userRepository.save(user);
    }
    

public User loginUser(String email, String password) {

    if (email == null || email.isBlank()
            || password == null || password.isBlank()) {
        throw new IllegalArgumentException(
                "Email and password are required.");
    }

    User user = userRepository.findByEmail(
            email.trim().toLowerCase()
    ).orElseThrow(() ->
            new IllegalArgumentException(
                    "Invalid email or password.")
    );

    if (!passwordEncoder.matches(password, user.getPassword())) {
        throw new IllegalArgumentException(
                "Invalid email or password.");
    }

    return user;
}

}

