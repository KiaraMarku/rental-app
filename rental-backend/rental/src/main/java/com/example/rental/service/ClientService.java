package com.example.rental.service;

import com.example.rental.entety.Client;
import com.example.rental.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClients(){
        return clientRepository.findAll();
    }

    public Client getClientById(int id){
        return clientRepository.findById(id).orElse(null);
    }

    public void updateClient(Client client){
        clientRepository.save(client);
    }

    public void deleteClient(Client client){
        clientRepository.delete(client);
    }

}
