package com.example.rental.controller;

import com.example.rental.entety.Agent;
import com.example.rental.service.AgentService;
import com.example.rental.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final PropertyService propertyService;
    private final AgentService agentService;

    public DashboardController(PropertyService propertyService, AgentService agentService) {
        this.propertyService = propertyService;
        this.agentService = agentService;
    }

    @GetMapping("/property-stats")
    public ResponseEntity<Map<String, Integer>> getPropertyStatistics() {
        Map<String, Integer> stats = new HashMap<>();
        stats.put("rentedCount", propertyService.countByStatus("RENTED"));
        stats.put("reservedCount", propertyService.countByStatus("RESERVED"));
        stats.put("availableCount", propertyService.countByStatus("AVAILABLE"));
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/agent-properties")
    public ResponseEntity<Map<String, Integer>> getAgentPropertyCounts() {
        List<Agent> agents = agentService.getAllAgents();
        Map<String, Integer> agentPropertyCounts = new HashMap<>();

        for (Agent agent : agents) {
            int propertyCount = propertyService.countByAgentId(agent.getId());
            agentPropertyCounts.put(agent.getFirstName() + " " + agent.getLastName(), propertyCount);
        }

        return ResponseEntity.ok(agentPropertyCounts);
    }
}