package com.example.rental.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class RentDTO {
    private Integer id;
    private Integer propertyId;
    private Integer clientId;
    private BigDecimal price;
    private LocalDate rentStart;
    private LocalDate rentEnd;
}