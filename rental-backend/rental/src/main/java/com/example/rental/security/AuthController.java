package com.example.rental.security;


import com.example.rental.dto.RegistrationDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    UserRegistrationService  registrationService;

    public AuthController(
        AuthenticationManager authenticationManager,
        JwtTokenProvider tokenProvider,

        UserRegistrationService  registrationService
    ) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.registrationService=registrationService;

    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(
        @RequestParam String username, 
        @RequestParam String password
    ) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(Map.of("token", jwt));
    }


        @PostMapping("/register/customer")
        public ResponseEntity<?> registerCustomer( @RequestBody RegistrationDTO dto) {
            try {
                registrationService.registerCustomer(dto);
                return ResponseEntity.ok(Map.of("message", "Customer registered successfully"));
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

        @PostMapping("/register/agent")
        public ResponseEntity<?> registerAgent( @RequestBody RegistrationDTO dto) {
            try {
                registrationService.registerAgent(dto);
                return ResponseEntity.ok(Map.of("message", "Agent registered successfully"));
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
    }


