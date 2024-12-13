package com.example.rental.entety;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "rent")
@Data
@NoArgsConstructor
public class Rent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "property_id")
    private Integer propertyId;
    @Column(name = "client_id")
    private Integer clientId;
    @Column(name = "rent_start")
    private LocalDate rentStart;
    @Column(name = "rent_end")
    private LocalDate rentEnd;
    private BigDecimal price;

    @OneToOne
    @JoinColumn(name = "property_id", insertable = false, updatable = false)
    private Property property;

    @ManyToOne
    @JoinColumn(name = "client_id", insertable = false, updatable = false)
    private Client client;
}
