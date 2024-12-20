package com.example.rental.service;

import com.example.rental.entety.Agent;
import com.example.rental.entety.Client;
import com.example.rental.entety.User;
import com.example.rental.repository.AgentRepository;
import com.example.rental.repository.ClientRepository;
import com.example.rental.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentService {

    private AgentRepository agentRepository;
    private UserRepository userRepository;

    public AgentService(AgentRepository agentRepository, UserRepository userRepository) {
        this.agentRepository = agentRepository;
        this.userRepository = userRepository;
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

    public Agent getAgentByUsername(String userName){
        return agentRepository.findByUsername(userName);
    }
    public void deleteAgent(Integer id){
        Agent agent=agentRepository.findById(id).orElse(null);
        agentRepository.deleteById(id);
        userRepository.deleteById(agent.getUsername());
    }

}
