package com.example.rental.exceptions;

public class CustomRegistrationException extends RuntimeException {
    public CustomRegistrationException(String message) {
        super(message);
    }
}