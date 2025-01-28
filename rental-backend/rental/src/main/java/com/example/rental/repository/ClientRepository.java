package com.example.rental.repository;
import com.example.rental.entety.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    Client findByUsername(String userName);

    @Query("SELECT DISTINCT c FROM Client c JOIN c.rents r JOIN r.property p WHERE p.agent.id = :agentId")
    List<Client> findRentClientsByAgentId(@Param("agentId") Integer agentId);

    @Query("SELECT DISTINCT c FROM Client c JOIN c.reservations r JOIN r.property p WHERE p.agent.id = :agentId")
    List<Client> findReservationClientsByAgentId(@Param("agentId") Integer agentId);
}