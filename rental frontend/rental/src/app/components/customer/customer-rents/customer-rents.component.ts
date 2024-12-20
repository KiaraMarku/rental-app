import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Rent } from '../../../model/rent';
import { AuthService } from '../../../services/auth.service';
import { RentService } from '../../../services/rent.service';

@Component({
  selector: 'app-customer-rents',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatButtonToggle,
    MatButtonToggleGroup,
    CurrencyPipe,
    MatCardModule,
    MatIcon,
    MatButtonModule,
    DatePipe],
  templateUrl: './customer-rents.component.html',
  styleUrl: './customer-rents.component.css'
})
export class CustomerRentsComponent {
  rents: Rent[] = [];

  constructor(private authService: AuthService,
    private rentService: RentService) {

  }

  user = this.authService.getUser();
  client = this.authService.getClientValue();
  ngOnInit(): void {
    this.loadRents();
  }

  loadRents() {
    const clientId = this.client!.id;
    this.rentService.getRentsByClient(clientId).subscribe({
      next: (data) => this.rents = data,
      error: (error) => console.error('Error:', error)
    });
  }
}
