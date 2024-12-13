package com.example.rental.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationDTO {
    private Integer id;
    private Integer propertyId;
    private Integer clientId;
    private LocalDateTime reservedAt;
    private LocalDateTime expiresAt;
}
