import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Rent } from '../../../model/rent';
import { AuthService } from '../../../services/auth.service';
import { RentService } from '../../../services/rent.service';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Client } from '../../../model/client';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'app-agent-rents',
  standalone: true,
  imports: [CurrencyPipe,
    DatePipe,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption],
  templateUrl: './agent-rents.component.html',
  styleUrl: './agent-rents.component.css'
})
export class AgentRentsComponent {
  rents: Rent[] = [];
  clients: Client[] = [];
  selectedClientId: number | null = null;

  constructor(private authService: AuthService,
    private rentService: RentService) {
  }
  user = this.authService.getUser();
  agent = this.authService.getAgentValue()!;

  hideSingleSelectionIndicator = signal(false);

  ngOnInit(): void {
    this.loadRents();
    this.loadClients();
  }

  loadClients() {
    const agentId = this.agent!.id;
    console.log("Loading clients" + agentId)
    this.rentService.getRentClientsByAgent(agentId!).subscribe({
      next: (data) => this.clients = data,
      error: (error) => console.error('Error:', error)
    });
  }

  loadRentsByClient(clientId: number) {
    this.rentService.getAgentRentsByClient(this.agent?.id!, clientId).subscribe({
      next: (data) => this.rents = data,
      error: (error) => console.error('Error:', error)
    });
  }



  onClientChange(event: MatSelectChange) {
    this.selectedClientId = event.value;
    this.loadRentsByClient(this.selectedClientId!);
  }


  loadRents() {
    const agentId = this.agent.id!;
    this.rentService.getRentsByAgent(agentId).subscribe({
      next: (data) => this.rents = data,
      error: (error) => console.error('Error:', error)
    });
  }
}
