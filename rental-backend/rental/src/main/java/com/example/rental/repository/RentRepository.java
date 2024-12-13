package com.example.rental.repository;
import com.example.rental.entety.Agent;
import com.example.rental.entety.Rent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RentRepository extends JpaRepository<Rent, Integer> {
    Optional<Rent> findByPropertyId(Integer propertyId);
    List<Rent> findByClientId(Integer clientId);
}