package com.example.rental.repository;
import com.example.rental.entety.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Integer> {
    public List<Property> findByStatus(String status);
    public List<Property> findByAgentId(Integer id);

    int countByAgentId(Integer agentId);
    int countByStatus(String status);
}