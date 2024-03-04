package com.example.EPay.controller.authentication;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.EPay.model.AuthenticationRequest;
import com.example.EPay.model.AuthenticationResponse;
import com.example.EPay.services.security.AuthenticationService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class AuthenticationController {
    
    private final AuthenticationService authService;
    
    @PostMapping("login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        return new ResponseEntity<>(this.authService.authenticate(request), HttpStatus.OK);
    }
}
