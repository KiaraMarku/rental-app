import { Component } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { AuthService } from '../../../services/auth.service';
import { Reservation, ReservationRes } from '../../../model/reservation';
import { RentService } from '../../../services/rent.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-agent-reservations',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './agent-reservations.component.html',
  styleUrl: './agent-reservations.component.css'
})
export class AgentReservationsComponent {
  reservations: ReservationRes[] = [];
  selectedReservation: ReservationRes | null = null;
  isAcceptModalOpen = false;
  isDeclineModalOpen = false;
  agent = this.authService.getAgentValue();

  constructor(
    private reservationService: ReservationService,
    private rentService: RentService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.loadReservations();
  }

  loadReservations() {
    const agentId = this.agent!.id;
    this.reservationService.getReservationsByAgent(agentId!).subscribe({
      next: (data) => this.reservations = data,
      error: (error) => console.error('Error:', error)
    });
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
