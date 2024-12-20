package com.example.rental.entety;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;

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

    @Column(name = "rent_price")
    private BigDecimal rent;
    private String status;

    @Column(name = "contract_duration")
    private Integer contractDuration;

    @ManyToOne



    @JoinColumn(name = "agent_id", insertable = false, updatable = false)
    private Agent agent;

    @JsonIgnore()
    @OneToMany(mappedBy = "property")
    private List<Rent> rents;

    @JsonIgnore()
    @OneToMany(mappedBy = "property")
    private List<Reservation> reservations;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @JsonProperty("base64Image")
    public String getBase64Image() {
        return image != null ? Base64.getEncoder().encodeToString(image) : null;
    }
}