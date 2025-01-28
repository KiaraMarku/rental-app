package com.example.rental.service;

import com.example.rental.dto.PropertyDTO;
import com.example.rental.entety.Agent;
import com.example.rental.entety.Property;
import com.example.rental.repository.AgentRepository;
import com.example.rental.repository.PropertyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;
    private final AgentRepository agentRepository;
    private final ModelMapper modelMapper;

    public PropertyService(PropertyRepository propertyRepository,
                           AgentRepository agentRepository,
                           ModelMapper modelMapper) {
        this.propertyRepository = propertyRepository;
        this.agentRepository = agentRepository;
        this.modelMapper = modelMapper;
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property getPropertyById(Integer id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
    }
    public Property addProperty(PropertyDTO dto) {
        Agent agent = agentRepository.findById(dto.getAgentId())
            .orElseThrow(() -> new RuntimeException("Agent not found"));
            
        Property property = modelMapper.map(dto, Property.class);

        property.setAgent(agent);
        property.setStatus("available");

        if (dto.getBase64Image() != null) {
            property.setImage(Base64.getDecoder().decode(dto.getBase64Image()));
        }

        
        return propertyRepository.save(property);
    }

    public Property updateProperty( PropertyDTO dto) {
        Property property = propertyRepository.findById(dto.getId())
            .orElseThrow(() -> new RuntimeException("Property not found"));

        property.setAddress(dto.getAddress());
        property.setDescription(dto.getDescription());
        property.setRent(dto.getRent());
        property.setContractDuration(dto.getContractDuration());
        if (dto.getBase64Image() != null) {
            property.setImage(Base64.getDecoder().decode(dto.getBase64Image()));
        }

        if (dto.getAgentId() != null) {
            Agent agent = agentRepository.findById(dto.getAgentId())
                .orElseThrow(() -> new RuntimeException("Agent not found"));
            property.setAgent(agent);
        }
        
        return propertyRepository.save(property);
    }

    public void deleteProperty(Integer id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));


        if (!property.getStatus().equals("available")) {
            throw new RuntimeException("Cannot delete property that is rented or reserved");
        }

        propertyRepository.delete(property);
    }

    public List<Property> getAvailableProperties() {
        return propertyRepository.findByStatus("available");
    }
    public List<Property> getReservedProperties() {
        return propertyRepository.findByStatus("reserved");
    }
    public List<Property> getRentedProperties() {
        return propertyRepository.findByStatus("rented");
    }

    public List<Property> getPropertiesByAgent(Integer agentId) {
        return propertyRepository.findByAgentId(agentId);
    }


    public int countByStatus(String status) {
        return propertyRepository.countByStatus(status);
    }

    public int countByAgentId(Integer agentId) {
        return propertyRepository.countByAgentId(agentId);
    }
}