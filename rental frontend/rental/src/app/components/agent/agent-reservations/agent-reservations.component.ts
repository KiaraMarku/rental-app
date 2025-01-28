import { Component, signal, ViewChild } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { AuthService } from '../../../services/auth.service';
import { Reservation, ReservationRes } from '../../../model/reservation';
import { RentService } from '../../../services/rent.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { Client } from '../../../model/client';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'app-agent-reservations',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption],
  templateUrl: './agent-reservations.component.html',
  styleUrl: './agent-reservations.component.css'
})

export class AgentReservationsComponent {
  reservations: ReservationRes[] = [];
  selectedReservation: ReservationRes | null = null;
  isAcceptModalOpen = false;
  isDeclineModalOpen = false;
  clients: Client[] = [];
  selectedClientId: number | null = null;
  agent = this.authService.getAgentValue();



  hideSingleSelectionIndicator = signal(false);

  constructor(
    private reservationService: ReservationService,
    private rentService: RentService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.loadReservations();
    this.loadClients();
  }

  loadReservations() {
    const agentId = this.agent!.id;
    this.reservationService.getReservationsByAgent(agentId!).subscribe({
      next: (data) => this.reservations = data,
      error: (error) => console.error('Error:', error)
    });
  }

  loadClients() {
    const agentId = this.agent!.id;
    console.log("Loading clients" + agentId)
    this.reservationService.getReservationClientsByAgent(agentId!).subscribe({
      next: (data) => this.clients = data,
      error: (error) => console.error('Error:', error)
    });
  }

  loadPropertiesByClient(clientId: number) {
    this.reservationService.getAgentReservationsByClient(this.agent?.id!, clientId).subscribe({
      next: (data) => this.reservations = data,
      error: (error) => console.error('Error:', error)
    });
  }

  onClientChange(event: MatSelectChange) {
    this.selectedClientId = event.value;
    console.log(this.selectedClientId);
    this.loadPropertiesByClient(this.selectedClientId!);
  }


  showAcceptModal(reservation: ReservationRes) {
    this.selectedReservation = reservation;
    this.isAcceptModalOpen = true;
  }

  showDeclineModal(reservation: ReservationRes) {
    this.selectedReservation = reservation;
    this.isDeclineModalOpen = true;
  }

  closeAcceptModal() {
    this.isAcceptModalOpen = false;
    this.selectedReservation = null;
  }

  closeDeclineModal() {
    this.isDeclineModalOpen = false;
    this.selectedReservation = null;
  }
  acceptReservation() {
    const reservation = this.selectedReservation!;
    const rentData = {
      propertyId: reservation.property.id,
      clientId: reservation.client.id,
      price: reservation.property.rent,
      rentStart: new Date(),
      rentEnd: new Date(new Date().setMonth(new Date().getMonth() + reservation.property.contractDuration))
    };

    this.rentService.createRent(rentData).subscribe({
      next: () => {
        // Reservation will be automatically deleted by trigger
        this.loadReservations();
      },
      error: (error) => console.error('Error:', error)
    });
  }

  declineReservation() {
    const reservation = this.selectedReservation!;
    this.reservationService.cancelReservation(reservation.id).subscribe({
      next: () => this.loadReservations(),
      error: (error) => console.error('Error:', error)
    });
  }
}
