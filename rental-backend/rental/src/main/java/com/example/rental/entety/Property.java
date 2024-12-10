package com.example.rental.entety;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "property")
@Data
@NoArgsConstructor
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "agent_id")
    private Integer agentId;
    private String address;
    private String description;
    private BigDecimal rent;
    private String status;
    @Column(name = "contract_duration")
    private Integer contractDuration;

    @ManyToOne
    @JoinColumn(name = "agent_id", insertable = false, updatable = false)
    private Agent agent;

    @OneToOne(mappedBy = "property")
    private Rent activeRent;

    @OneToOne(mappedBy = "property")
    private Reservation activeReservations;
}
