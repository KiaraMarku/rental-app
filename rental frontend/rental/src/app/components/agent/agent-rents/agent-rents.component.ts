import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Rent } from '../../../model/rent';
import { AuthService } from '../../../services/auth.service';
import { RentService } from '../../../services/rent.service';

@Component({
  selector: 'app-agent-rents',
  standalone: true,
  imports: [CurrencyPipe,
    DatePipe,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './agent-rents.component.html',
  styleUrl: './agent-rents.component.css'
})
export class AgentRentsComponent {
  rents: Rent[] = [];

  constructor(private authService: AuthService,
    private rentService: RentService) {

  }

  user = this.authService.getUser();
  agent = this.authService.getAgentValue()!;
  ngOnInit(): void {
    this.loadRents();
  }

  loadRents() {
    const agentId = this.agent.id!;
    this.rentService.getRentsByAgent(agentId).subscribe({
      next: (data) => this.rents = data,
      error: (error) => console.error('Error:', error)
    });
  }
}
