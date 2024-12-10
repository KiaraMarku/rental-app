package com.example.rental.repository;
import com.example.rental.entety.Agent;
import com.example.rental.entety.Rent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentRepository extends JpaRepository<Rent, Integer> {

}