package com.example.rental.controller;

import com.example.rental.dto.PropertyDTO;
import com.example.rental.entety.Agent;
import com.example.rental.entety.Client;
import com.example.rental.entety.Property;
import com.example.rental.service.AgentService;
import com.example.rental.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/agents")
public class AgentController {

    private AgentService agentService;

    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    @GetMapping()
    public ResponseEntity<List<Agent>> getAllAgents(){
        return new ResponseEntity<>(agentService.getAllAgents(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agent> getAgent(@PathVariable int id){
        return new ResponseEntity<>(agentService.getAgentById(id), HttpStatus.FOUND);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Agent> getClientByUserName(@PathVariable String username){
        return new ResponseEntity<>(agentService.getAgentByUsername(username), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> registerCustomer( @RequestBody Agent agent) {
        try {
            agentService.updateAgent(agent);
            return ResponseEntity.ok(Map.of("message", "Customer updated successfully"));
        }
        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("")
    public ResponseEntity<?> updateAgent( @RequestBody Agent agent) {
        try {
             agentService.updateAgent(agent);
            return ResponseEntity.ok(Map.of("message", "Customer updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAgent(@PathVariable Integer id) {
        try {
            agentService.deleteAgent(id);
            return ResponseEntity.ok()
                    .body(Map.of("message", "Agent deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }











}
