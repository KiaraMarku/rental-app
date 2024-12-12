package com.example.rental.service;

import com.example.rental.dto.RentDTO;
import com.example.rental.entety.Client;
import com.example.rental.entety.Property;
import com.example.rental.entety.Rent;
import com.example.rental.repository.ClientRepository;
import com.example.rental.repository.PropertyRepository;
import com.example.rental.repository.RentRepository;
import com.example.rental.repository.ReservationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentService {
    private final RentRepository rentRepository;
    private final PropertyRepository propertyRepository;
    private final ClientRepository clientRepository;
    private final ReservationRepository reservationRepository;
    private final ModelMapper modelMapper;

    public RentService(RentRepository rentRepository,
                       PropertyRepository propertyRepository,
                       ClientRepository clientRepository,
                       ReservationRepository reservationRepository,
                       ModelMapper modelMapper) {
        this.rentRepository = rentRepository;
        this.propertyRepository = propertyRepository;
        this.clientRepository = clientRepository;
        this.reservationRepository = reservationRepository;
        this.modelMapper = modelMapper;
    }

    public List<Rent> getAllRents() {
        return rentRepository.findAll();
    }

    public Rent getRentById(Integer id) {
        return rentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rent not found"));
    }

    public Rent createRent(RentDTO dto) {
        Property property = propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));


        if (property.getStatus().equals("rented")) {
            throw new RuntimeException("Property is already rented");
        }

        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        //delete reservation
        if (property.getStatus().equals("reserved")) {
            reservationRepository.findByPropertyId(property.getId())
                    .ifPresent(reservationRepository::delete);
        }

        Rent rent = new Rent();
        rent.setProperty(property);
        rent.setClient(client);
        rent.setRentStart(dto.getRentStart());
        rent.setRentEnd(dto.getRentEnd());

        property.setStatus("rented");
        propertyRepository.save(property);

        return rentRepository.save(rent);
    }

    public Rent getRentByPropertyId(Integer propertyId) {
        return rentRepository.findByPropertyId(propertyId)
                .orElseThrow(() -> new RuntimeException("No rent found for this property"));
    }

    public List<Rent> getRentsByClientId(Integer clientId) {
        return rentRepository.findByClientId(clientId);
    }
}

