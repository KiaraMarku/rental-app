import { Component, computed, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReservationService } from '../../../services/reservation.service';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { ReservationRes } from '../../../model/reservation';


@Component({
  selector: 'app-customer-reservations',
  standalone: true,
  imports: [MatPaginatorModule,
    MatButtonToggle,
    MatButtonToggleGroup,
    CurrencyPipe,
    MatCardModule,
    MatIcon,
    MatButtonModule,
    DatePipe],
  templateUrl: './customer-reservations.component.html',
  styleUrl: './customer-reservations.component.css'
})
export class CustomerReservationsComponent implements OnInit {
  reservations: ReservationRes[] = [];
  isReserveModalOpen = false;
  selectedReservation!: ReservationRes;


  constructor(private authService: AuthService,
    private reservationService: ReservationService) {

  }

  user = this.authService.getUser();
  client = this.authService.getClientValue();
  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    const clientId = this.client!.id;
    this.reservationService.getReservationsByClient(clientId).subscribe({
      next: (data) => this.reservations = data,
      error: (error) => console.error('Error:', error)
    });
  }

  cancelReservation() {
    const id = this.selectedReservation.id;
    this.reservationService.cancelReservation(id).subscribe({
      next: () => {
        this.loadReservations();
        this.closeReserveModal()
      }
      ,
      error: (error) => console.error('Error:', error)
    });
  }


  showReserveModal(reservation: ReservationRes) {
    this.selectedReservation = reservation;
    this.isReserveModalOpen = true;
  }

  closeReserveModal() {
    this.isReserveModalOpen = false;
  }

}
