package com.example.rental.repository;
import com.example.rental.entety.Agent;
import com.example.rental.entety.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

}