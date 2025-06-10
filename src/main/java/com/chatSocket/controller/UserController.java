package com.chatSocket.controller;


import com.chatSocket.model.Storage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:63342")
public class UserController {

    @GetMapping("/active")
    public ResponseEntity<?> activeUsers() {
        return ResponseEntity.ok(Storage.activeUsers);
    }
}
