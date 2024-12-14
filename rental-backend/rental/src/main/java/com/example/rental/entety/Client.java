package com.example.rental.entety;

import com.example.rental.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Table(name = "client")
@Data
@NoArgsConstructor
public class Client   {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String phone;
    private String email;


    @OneToMany(mappedBy = "client")
    private List<Rent> rents;

    @OneToMany(mappedBy = "client")
    private List<Reservation> reservations;
}