package com.example.rental.service;

import com.example.rental.entety.Rent;
import com.example.rental.entety.RentHistory;
import com.example.rental.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentHistoryService {
    private final RentHistoryRepository rentHistoryRepository;

    public RentHistoryService(RentHistoryRepository rentHistoryRepository) {
        this.rentHistoryRepository = rentHistoryRepository;

    }

    public List<RentHistory> getAllRentHistory() {
        return rentHistoryRepository.findAll();
    }

    public RentHistory getRentHistoryById(Integer id) {
        return rentHistoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rent not found"));
    }



    public RentHistory getRentHistoryByPropertyId(Integer propertyId) {
        return rentHistoryRepository.findByPropertyId(propertyId)
                .orElseThrow(() -> new RuntimeException("No rent history found for this property"));
    }

    public List<RentHistory> getRentHistoryByClientId(Integer clientId) {
        return rentHistoryRepository.findByClientId(clientId);
    }
}

