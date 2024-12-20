package com.example.rental.controller;

import com.example.rental.dto.RentDTO;
import com.example.rental.entety.Rent;
import com.example.rental.entety.RentHistory;
import com.example.rental.service.RentHistoryService;
import com.example.rental.service.RentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rents/history")
public class RentHistoryController {
    private final RentHistoryService rentHistoryService;

    public RentHistoryController(RentHistoryService rentHistoryService) {
        this.rentHistoryService = rentHistoryService;
    }
    @GetMapping
    public ResponseEntity<List<RentHistory>> getAllRentHistory() {
        return ResponseEntity.ok(rentHistoryService.getAllRentHistory());
    }
    @GetMapping("/{id}")
    public ResponseEntity<RentHistory> getRentHistoryById(@PathVariable Integer id) {
        RentHistory rentHistory = rentHistoryService.getRentHistoryById(id);
        return ResponseEntity.ok(rentHistory);
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<RentHistory> getPropertyRentHistory(@PathVariable Integer propertyId) {
        RentHistory rentHistory = rentHistoryService.getRentHistoryByPropertyId(propertyId);
        return ResponseEntity.ok(rentHistory);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<RentHistory>> getClientRentHistory(@PathVariable Integer clientId) {
        return ResponseEntity.ok(rentHistoryService.getRentHistoryByClientId(clientId));
    }
}
