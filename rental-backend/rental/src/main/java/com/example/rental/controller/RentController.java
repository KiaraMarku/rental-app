package com.example.rental.controller;

import com.example.rental.dto.RentDTO;
import com.example.rental.entety.Rent;
import com.example.rental.service.RentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rents")
public class RentController {
    private final RentService rentService;

    public RentController(RentService rentService) {
        this.rentService = rentService;
    }

    @GetMapping
    public ResponseEntity<List<Rent>> getAllRents() {
        return ResponseEntity.ok(rentService.getAllRents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rent> getRentById(@PathVariable Integer id) {
        Rent rent = rentService.getRentById(id);
        return ResponseEntity.ok(rent);
    }

    @PostMapping
    public ResponseEntity<?> createRent(@RequestBody RentDTO dto) {
        try {
            Rent rent = rentService.createRent(dto);
            return ResponseEntity.ok(rent);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<Rent> getPropertyRent(@PathVariable Integer propertyId) {
        Rent rent = rentService.getRentByPropertyId(propertyId);
        return ResponseEntity.ok(rent);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Rent>> getClientRents(@PathVariable Integer clientId) {
        return ResponseEntity.ok(rentService.getRentsByClientId(clientId));
    }
}
