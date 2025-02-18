package com.example.rental.entety;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "rent_history")
@Data
@NoArgsConstructor
public class RentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "rent_start")
    private LocalDate rentStart;
    @Column(name = "rent_end")
    private LocalDate rentEnd;

    @Column(name = "created_at")
    private LocalTime createdAt;
    private BigDecimal price;

    @OneToOne
    @JoinColumn(name = "property_id")
    private Property property;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
}
