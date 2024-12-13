package com.example.rental.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
}