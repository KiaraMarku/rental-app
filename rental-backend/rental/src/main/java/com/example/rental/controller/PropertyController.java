package com.example.rental.controller;

import com.example.rental.dto.PropertyDTO;
import com.example.rental.entety.Property;
import com.example.rental.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {


    private PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {

            List<Property> properties = propertyService.getAllProperties();
            return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Integer id) {

            Property property = propertyService.getPropertyById(id);
            return ResponseEntity.ok(property);
    }

    @PostMapping
    public ResponseEntity<?> addProperty(@RequestBody PropertyDTO dto) {
        try {
            Property property = propertyService.addProperty(dto);
            return ResponseEntity.ok(property);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<?> getPropertiesByAgent(@PathVariable Integer agentId) {
        try {
            List<Property> properties = propertyService.getPropertiesByAgent(agentId);
            return ResponseEntity.ok(properties);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProperty(@PathVariable Integer id, @RequestBody PropertyDTO dto) {
        try {
            Property updated = propertyService.updateProperty(id, dto);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Integer id) {
        try {
            propertyService.deleteProperty(id);
            return ResponseEntity.ok()
                .body(Map.of("message", "Property deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAvailableProperties() {
        try {
            List<Property> properties = propertyService.getAvailableProperties();
            return ResponseEntity.ok(properties);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }
}