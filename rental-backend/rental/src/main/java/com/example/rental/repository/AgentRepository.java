package com.example.rental.repository;
import com.example.rental.entety.Agent;
import com.example.rental.entety.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AgentRepository extends JpaRepository<Agent, Integer> {

    Agent findByUsername(String userName);
}