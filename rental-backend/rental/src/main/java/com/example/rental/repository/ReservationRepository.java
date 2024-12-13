package com.example.rental.repository;
import com.example.rental.entety.Agent;
import com.example.rental.entety.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    public List<Reservation> findByClientId(int clientId);

    public Optional<Reservation> findByPropertyId(int propertyId);
}