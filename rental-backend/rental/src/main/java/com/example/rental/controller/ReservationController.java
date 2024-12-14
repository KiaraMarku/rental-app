package com.example.rental.controller;

import com.example.rental.dto.ReservationDTO;
import com.example.rental.entety.Reservation;
import com.example.rental.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Integer id) {
        Reservation reservation = reservationService.getReservationById(id);
        return ResponseEntity.ok(reservation);
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationDTO dto) {
        try {
            Reservation reservation = reservationService.createReservation(dto);
            return ResponseEntity.ok(reservation);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateReservation(@RequestBody ReservationDTO dto) {
        try {
            Reservation reservation = reservationService.updateReservation(dto);
            return ResponseEntity.ok(reservation);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelReservation(@PathVariable Integer id) {
        try {
            reservationService.cancelReservation(id);
            return ResponseEntity.ok(Map.of("message", "Reservation cancelled successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<Reservation> getPropertyReservation(@PathVariable Integer propertyId) {
        Reservation reservation = reservationService.getReservationByPropertyId(propertyId);
        return ResponseEntity.ok(reservation);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Reservation>> getClientReservations(@PathVariable Integer clientId) {
        return ResponseEntity.ok(reservationService.getReservationsByClientId(clientId));
    }
}