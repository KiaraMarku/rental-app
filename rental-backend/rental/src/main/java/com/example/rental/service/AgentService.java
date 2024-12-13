package com.example.rental.service;

import com.example.rental.entety.Agent;
import com.example.rental.entety.Client;
import com.example.rental.repository.AgentRepository;
import com.example.rental.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentService {

    AgentRepository agentRepository;

    public AgentService(AgentRepository agentRepository) {
        this.agentRepository = agentRepository;
    }

    public List<Agent> getAllAgents(){
        return agentRepository.findAll();
    }

    public Agent getAgentById(int id){
        return agentRepository.findById(id).orElse(null);
    }

    public void updateAgent(Agent agent){
        agentRepository.save(agent);
    }

    public void deleteAgent(Agent agent){
        agentRepository.delete(agent);
    }

}
