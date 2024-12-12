package com.example.rental.repository;
import com.example.rental.entety.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Integer> {
    public List<Property> findByStatus(String status);
    public List<Property> findByAgentId(Integer id);

    @Query("SELECT p FROM Property p JOIN p.activeRent r WHERE r.client.id = :clientId")
    List<Property> findPropertiesRentedByClient(@Param("clientId") Integer clientId);


    @Query("SELECT p FROM Property p JOIN p.activeReservation r WHERE r.client.id = :clientId")
    List<Property> findPropertiesReservedByClient(@Param("clientId") Integer clientId);

}