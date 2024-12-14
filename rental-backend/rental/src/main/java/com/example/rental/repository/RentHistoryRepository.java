package com.example.rental.repository;
import com.example.rental.entety.Rent;
import com.example.rental.entety.RentHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RentHistoryRepository extends JpaRepository<RentHistory, Integer> {
    Optional<RentHistory> findByPropertyId(Integer propertyId);
    List<RentHistory> findByClientId(Integer clientId);
}