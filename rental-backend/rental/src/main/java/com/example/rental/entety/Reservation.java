package com.example.rental.entety;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservation")
@Data
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "client_id")
    private Integer clientId;
    @Column(name = "property_id")
    private Integer propertyId;
    @Column(name = "reserved_at")
    private LocalDateTime reservedAt;
    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @PrePersist
    private void setExpirationDate() {
        if (reservedAt == null) {
            reservedAt = LocalDateTime.now();
        }
        expiresAt = reservedAt.plusDays(3);
    }

    @OneToOne
    @JoinColumn(name = "property_id", insertable = false, updatable = false)
    private Property property;

    @ManyToOne
    @JoinColumn(name = "client_id", insertable = false, updatable = false)
    private Client client;
}
