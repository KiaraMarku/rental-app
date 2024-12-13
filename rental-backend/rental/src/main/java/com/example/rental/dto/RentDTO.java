package com.example.rental.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RentDTO {
    private Integer id;
    private Integer propertyId;
    private Integer clientId;
    private LocalDate rentStart;
    private LocalDate rentEnd;
}