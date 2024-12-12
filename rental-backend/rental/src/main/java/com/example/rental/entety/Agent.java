package com.example.rental.entety;

import com.example.rental.dto.UserDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


@Entity
@Table(name = "agent")
@Data
@NoArgsConstructor
public class Agent  {
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

    @OneToMany(mappedBy = "agent")
    private List<Property> properties;
}