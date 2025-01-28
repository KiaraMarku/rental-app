package com.example.rental.service;

import com.example.rental.dto.ReservationDTO;
import com.example.rental.entety.Client;
import com.example.rental.entety.Property;
import com.example.rental.entety.Rent;
import com.example.rental.entety.Reservation;
import com.example.rental.repository.ClientRepository;
import com.example.rental.repository.PropertyRepository;
import com.example.rental.repository.ReservationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final PropertyRepository propertyRepository;
    private final ClientRepository clientRepository;

    private ModelMapper modelMapper;


    public ReservationService(ReservationRepository reservationRepository,
                              PropertyRepository propertyRepository,
                              ClientRepository clientRepository, ModelMapper modelMapper) {
        this.reservationRepository = reservationRepository;
        this.propertyRepository = propertyRepository;
        this.clientRepository = clientRepository;
        this.modelMapper = modelMapper;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Integer id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    public Reservation createReservation(ReservationDTO dto) {
        Property property = propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (!property.getStatus().equals("available")) {
            throw new RuntimeException("Property is not available for reservation");
        }

        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Reservation reservation = new Reservation();
        reservation.setProperty(property);
        reservation.setClient(client);
        reservation.setReservedAt(LocalDateTime.now());
        reservation.setExpiresAt(LocalDateTime.now().plusDays(3));
 //        property.setStatus("reserved");
//        propertyRepository.save(property);
        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(ReservationDTO dto ){
        Reservation reservation=reservationRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Could not find reservation"));

        modelMapper.map(dto,reservation);
        Property property=propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Could not find property for reservation"));

        if (!property.getStatus().equals("available")) {
            throw new RuntimeException("Property is not available for reservation");
        }

        Client client=clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Could not find client for reservation"));
        reservation.setClient(client);

        return reservationRepository.save(reservation);
    }

    public void cancelReservation(Integer id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

//       Property property = reservation.getProperty();
//        property.setStatus("available");
//        propertyRepository.save(property);

//        reservation.setProperty(null);
//        reservation.setClient(null);

        reservationRepository.deleteById(id);
    }

    public Reservation getReservationByPropertyId(Integer propertyId) {
        return reservationRepository.findByPropertyId(propertyId)
                .orElseThrow(() -> new RuntimeException("No reservation found for this property"));
    }

    public List<Reservation> getReservationsByClientId(Integer clientId) {
        return reservationRepository.findByClientId(clientId);
    }

    public List<Reservation> getReservationsByClientIdAndAgentId(Integer clientId, Integer agentId) {
        return reservationRepository.findByClientId(clientId).stream()
                .filter(reservation -> reservation.getProperty().getAgent().getId().equals(agentId))
                .collect(Collectors.toList());
    }



}
