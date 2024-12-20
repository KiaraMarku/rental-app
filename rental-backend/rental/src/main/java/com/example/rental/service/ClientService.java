package com.example.rental.service;

import com.example.rental.entety.Client;
import com.example.rental.repository.ClientRepository;
import com.example.rental.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

   private ClientRepository clientRepository;
   private  UserRepository userRepository;

    public ClientService(ClientRepository clientRepository, UserRepository userRepository) {
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
    }
    public List<Client> getAllClients(){
        return clientRepository.findAll();
    }

    public Client getClientById(int id){
        return clientRepository.findById(id).orElse(null);
    }


    public Client getClientByUsername(String userName){
        return clientRepository.findByUsername(userName);
    }
    public void updateClient(Client client){
        clientRepository.save(client);
    }

    public void deleteClient(int id){
        Client client=this.clientRepository.findById(id).orElse(null);
        clientRepository.delete(client);
        userRepository.deleteById(client.getUsername());
    }

}
