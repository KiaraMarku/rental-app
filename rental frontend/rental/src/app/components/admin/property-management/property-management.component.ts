import { CommonModule } from "@angular/common";
import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from "@angular/forms";
import { Property } from "../../../model/property";
import { Agent } from "../../../model/agent";
import { PropertyService } from "../../../services/property.service";
import { AgentService } from "../../../services/agent.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';

@Component({
  selector: 'app-property-management',
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
  templateUrl: './property-management.component.html',
  styleUrls: ['./property-management.component.css']
})
export class PropertyManagementComponent implements OnInit {
  properties: Property[] = [];
  agents: Agent[] = [];
  propertyForm: FormGroup;
  error = '';
  isModalOpen = false;
  isDeleteModalOpen = false;
  isEditing = false;

  selectedProperty: Property | null = null;
  selectedAgentId!: number;
  selectedStatus = '';


  //For pagination
  paginatedProperties: Property[] = [];
  pageSize = 6;
  currentPage = 0;

  @ViewChild('toggleGroup') toggleGroup!: MatButtonToggleGroup;
  hideSingleSelectionIndicator = signal(false);



  constructor(
    private propertyService: PropertyService,
    private agentService: AgentService,
    private fb: FormBuilder,

  ) {
    this.propertyForm = this.fb.group({
      address: ['', Validators.required],
      description: ['', Validators.required],
      rent: ['', [Validators.required, Validators.min(0)]],
      agentId: ['', Validators.required],
      contractDuration: ['', Validators.required],
      base64Image: [null]
    });
  }

  ngOnInit() {
    this.loadProperties();
    this.loadAgents();
  }


  loadProperties() {
    this.propertyService.getAllProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.currentPage = 0;  // 
        this.updatePage();
      },
      error: (error) => this.error = error.error?.message || 'Failed to load properties'
    });
  }


  loadAgents() {
    this.agentService.getAllAgents().subscribe({
      next: (data) => this.agents = data,
      error: (error) => this.error = error.error?.message || 'Failed to load agents'
    });
  }

  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update(value => !value);
  }


  onStatusChange(event: MatButtonToggleChange) {

    this.selectedStatus = event.value;
    console.log('Selected status:', this.selectedStatus);
    if (this.selectedStatus == 'all') {
      this.loadProperties();
    }
    else this.loadPropertiesByStatus(this.selectedStatus);

  }

  onAgentChange(event: MatSelectChange) {
    this.selectedAgentId = event.value;
    this.toggleGroup.value = null;
    console.log('Selected agent:', this.selectedAgentId);
    this.loadPropertiesByAgent(this.selectedAgentId)
  }

  loadPropertiesByStatus(status: string) {
    this.propertyService.getPropertiesByStatus(status).subscribe({
      next: (data) => {
        this.properties = data;
        this.currentPage = 0;  // 
        this.updatePage();
      },
      error: (error) => this.error = error.error?.message || 'Failed to load properties'
    });
  }


  loadPropertiesByAgent(agnetId: number) {
    this.propertyService.getPropertiesByAgent(agnetId).subscribe({
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

  showDeleteModal(property: Property) {
    this.selectedProperty = property;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.selectedProperty = null;
  }

  confirmDelete() {
    if (this.selectedProperty) {
      this.propertyService.deleteProperty(this.selectedProperty.id!).subscribe({
        next: () => {
          this.loadProperties();
          this.closeDeleteModal();
        },
        error: (error) => this.error = error.error?.message || 'Failed to delete property'
      });
    }
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
            this.loadProperties();
            this.closeModal();
          },
          error: (error) => this.error = error.error?.message || 'Failed to update property'
        });
      } else {
        // For new property
        this.propertyService.addProperty(propertyData).subscribe({
          next: () => {
            this.loadProperties();
            this.closeModal();
          },
          error: (error) => this.error = error.error?.message || 'Failed to add property'
        });
      }
    }
  }

}