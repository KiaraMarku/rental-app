package com.example.rental.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PropertyDTO {
    private Integer id;
    private String address;
    private String description;
    private BigDecimal rent;
    private Integer contractDuration;
    private String base64Image;
    private Integer agentId;
}