import { CommonModule, NgIf } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Property } from '../../../model/property';
import { PropertyService } from '../../../services/property.service';
import { AgentService } from '../../../services/agent.service';
import { AuthService } from '../../../services/auth.service';
import { Agent } from '../../../model/agent';

@Component({
  selector: 'app-agent-properties',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatPaginatorModule,
    MatButtonToggle,
    MatButtonToggleGroup
  ],
  templateUrl: './agent-properties.component.html',
  styleUrl: './agent-properties.component.css'
})

export class AgentPropertiesComponent {


  properties: Property[] = [];
  error = '';
  isModalOpen = false;
  isDeleteModalOpen = false;
  isEditing = false;
  agent = this.authService.getAgentValue();

  selectedProperty: Property | null = null;
  selectedStatus = '';


  //For pagination
  paginatedProperties: Property[] = [];
  pageSize = 6;
  currentPage = 0;

  @ViewChild('toggleGroup') toggleGroup!: MatButtonToggleGroup;
  hideSingleSelectionIndicator = signal(false);
  propertyForm: FormGroup;




  constructor(
    private propertyService: PropertyService,
    private agentService: AgentService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.propertyForm = this.fb.group({
      address: ['', Validators.required],
      description: ['', Validators.required],
      rent: ['', [Validators.required, Validators.min(0)]],
      contractDuration: ['', Validators.required],
      base64Image: [null]
    });
  }

  ngOnInit() {
    if (this.agent?.id !== undefined) {
      this.loadPropertiesForAgent(this.agent.id);
    }
    console.log(this.agent);

  }





  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update(value => !value);
  }




  loadPropertiesForAgent(agentId: number) {
    this.propertyService.getPropertiesByAgent(agentId).subscribe({
      next: (data) => {
        this.properties = data;
        this.currentPage = 0;  // 
        this.updatePage();
      },
      error: (error) => this.error = error.error?.message || 'Failed to load properties'
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



  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const base64Clean = base64.split(',')[1] || base64;
        this.propertyForm.patchValue({ base64Image: base64Clean });
      };
      reader.readAsDataURL(file);
    }
  }

  showModal() {
    this.isModalOpen = true;
  }

  showEditModal(property: Property) {
    this.isEditing = true;
    this.selectedProperty = property;
    this.propertyForm.patchValue({
      id: property.id,
      address: property.address,
      description: property.description,
      rent: property.rent,
      agentId: property.agentId,
      contractDuration: property.contractDuration
    });
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEditing = false;
    this.selectedProperty = null;
    this.propertyForm.reset();
  }


  onSubmit() {
    if (this.propertyForm.valid) {
      const propertyData = this.propertyForm.value;

      if (this.isEditing && this.selectedProperty) {
        propertyData.id = this.selectedProperty.id;
        this.propertyService.updateProperty(propertyData).subscribe({
          next: () => {
            if (this.agent?.id !== undefined) {
              this.loadPropertiesForAgent(this.agent.id);
            }
            this.closeModal();
          },
          error: (error) => this.error = error.error?.message || 'Failed to update property'
        });
      } else {
        // For new property
        this.propertyService.addProperty(propertyData).subscribe({
          next: () => {
            if (this.agent?.id !== undefined) {
              this.loadPropertiesForAgent(this.agent.id);
            }
            this.closeModal();
          },
          error: (error) => this.error = error.error?.message || 'Failed to add property'
        });
      }
    }
  }




}
