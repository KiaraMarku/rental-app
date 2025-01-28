package com.example.rental.controller;

import com.example.rental.dto.UserDTO;
import com.example.rental.entety.Client;
import com.example.rental.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/clients")
public class ClientController {

    private ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping()
    public ResponseEntity<List<Client>> getAllClients(){
        return new ResponseEntity<>(clientService.getAllClients(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClient(@PathVariable int id){
        return new ResponseEntity<>(clientService.getClientById(id), HttpStatus.OK);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Client> getClientByUserName(@PathVariable String username){
        return new ResponseEntity<>(clientService.getClientByUsername(username), HttpStatus.OK);
    }
    @PostMapping()
    public ResponseEntity<?> updateClient( @RequestBody Client client) {
        try {
            clientService.updateClient(client);
            return ResponseEntity.ok(Map.of("message", "Customer updated successfully"));
        }
        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable Integer id) {
        try {
            clientService.deleteClient(id);
            return ResponseEntity.ok()
                    .body(Map.of("message", "Client deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }
    
    
    @GetMapping("rent/agent/{agentId}")
    public ResponseEntity<List<Client>> getRentClientsByAgent(@PathVariable int agentId) {
        try {
            List<Client> clients = clientService.getRentClientsByAgentId(agentId);
            return new ResponseEntity<>(clients, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(null);
        }
    }

    @GetMapping("reservation/agent/{agentId}")
    public ResponseEntity<List<Client>> getReservationClientsByAgent(@PathVariable int agentId) {
        try {
            List<Client> clients = clientService.getReservationClientsByAgentId(agentId);
            return new ResponseEntity<>(clients, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(null);
        }
    }





}
