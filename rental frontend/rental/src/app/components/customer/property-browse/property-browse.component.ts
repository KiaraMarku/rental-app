import { Component, computed, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Property } from '../../../model/property';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { CurrencyPipe } from '@angular/common';
import { PropertyService } from '../../../services/property.service';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReservationService } from '../../../services/reservation.service';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PropertyFilterPipe } from "../../../property-filter.pipe";
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-property-browse',
  standalone: true,
  imports: [MatPaginatorModule,
    MatButtonToggle,
    MatButtonToggleGroup,
    CurrencyPipe,
    MatCardModule,
    MatIcon,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    PropertyFilterPipe],
  templateUrl: './property-browse.component.html',
  styleUrl: './property-browse.component.css'
})
export class PropertyBrowseComponent {

  properties: Property[] = [];
  selectedProperty: Property | null = null;
  error = '';
  isReserveModalOpen = false;
  searchText = '';
  //For pagination
  paginatedProperties: Property[] = [];
  pageSize = 6;
  currentPage = 0;
  constructor(private authService: AuthService,
    private propertyService: PropertyService,
    private reservationService: ReservationService
  ) {

  }

  user = this.authService.getUser();
  client = this.authService.getClientValue();

  ngOnInit(): void {
    console.log(this.client)
    this.loadProperties();
  }

  getClient() {

  }

  loadProperties() {
    this.propertyService.getPropertiesByStatus("available").subscribe({
      next: (data) => {
        this.properties = data;
        this.currentPage = 0;  // 
        this.updatePage();
      },

      error: (error) => {
        console.log(error.error?.message)
        this.error = 'Failed to load properties'
      }
    });
  }


  updatePage() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProperties = this.properties.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePage();
  }

  showReserveModal(property: Property) {
    this.selectedProperty = property;
    this.isReserveModalOpen = true;
  }

  closeReserveModal() {
    this.isReserveModalOpen = false;
    this.selectedProperty = null;
  }


  confirmReserve() {
    if (this.selectedProperty) {

      if (!this.client) {
        console.error('No client found');
        return;
      }

      const reservation = {
        propertyId: this.selectedProperty.id,
        clientId: this.client.id,
      };

      this.reservationService.createReservation(reservation).subscribe({
        next: () => {
          this.loadProperties();
          this.closeReserveModal();
        },
        error: (error) => {
          console.error('Error:', error);
          this.error = error.error?.message || "Failed to reserve property";
        }
      });
    }
  }


}
