import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AgentService } from '../../../services/agent.service';
import { Agent } from '../../../model/agent';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-agent-management',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatCardModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './agent-management.component.html',
  styleUrl: './agent-management.component.css'
})
export class AgentManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'phone', 'actions'];
  agents: Agent[] = [];
  dataSource: any;
  agentForm!: FormGroup;
  error = '';

  isModalOpen = false;
  isDeleteModalOpen = false;
  selectedAgent: Agent | null = null;
  isEditing = false;


  constructor(private agentService: AgentService, private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.agentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    }, {
    });
  }


  get firstName() { return this.agentForm.get('firstName'); }
  get lastName() { return this.agentForm.get('lastName'); }
  get email() { return this.agentForm.get('email'); }
  get phone() { return this.agentForm.get('phone'); }


  ngOnInit(): void {
    this.loadAgents();

  }
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;


  loadAgents() {
    this.agentService.getAllAgents().subscribe({
      next: (data) => {
        this.agents = data;
        console.log(this.agents);
        this.dataSource = new MatTableDataSource<Agent>(this.agents);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => this.error = error.error?.message || 'Failed to load agents'
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  showEditModal(agent: Agent) {
    this.isEditing = true;
    this.selectedAgent = agent;
    this.agentForm.patchValue({
      id: agent.id,
      username: agent.username,
      firstName: agent.firstName,
      lastName: agent.lastName,
      email: agent.email,
      phone: agent.phone
    });
    this.isModalOpen = true;
  }

  showDeleteModal(agent: Agent) {
    this.selectedAgent = agent;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.selectedAgent = null;
  }

  confirmDelete() {
    if (this.selectedAgent) {
      this.agentService.deleteAgent(this.selectedAgent.id!).subscribe({
        next: () => {
          this.loadAgents();
          this.closeDeleteModal();
        },
        error: (error) => this.error = error.error?.message || 'Failed to delete property'
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEditing = false;
    this.selectedAgent = null;
    this.agentForm.reset();
  }

  onSubmit() {
    if (this.agentForm.valid) {
      const agentData = this.agentForm.value;
      agentData.id = this.selectedAgent!.id;
      this.agentService.updateAgent(agentData).subscribe({
        next: () => {
          this.loadAgents();
          this.closeModal();
        },
        error: (error) => this.error = error.error?.message || 'Failed to update agent'
      });
    }
  }


}

