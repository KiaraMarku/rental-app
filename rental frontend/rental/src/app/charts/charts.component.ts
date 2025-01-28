import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { Chart } from 'chart.js';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
  BarController
} from 'chart.js';
import { DashboardService } from '../services/dashboard.service';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
  BarController
);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadChartData();
  }

  private loadChartData() {
    // Load pie chart data
    this.dashboardService.getPropertyStatistics().subscribe({
      next: (stats) => {
        this.pieChartData = {
          labels: ['Rented', 'Reserved', 'Available'],
          datasets: [{
            data: [
              stats.rentedCount,
              stats.reservedCount,
              stats.availableCount
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        };
      },
      error: (error) => console.error('Error loading property statistics:', error)
    });

    this.dashboardService.getAgentPropertyCounts().subscribe({
      next: (data) => {
        this.barChartData = {
          labels: Object.keys(data),
          datasets: [{
            label: 'Properties Assigned',
            data: Object.values(data),
            backgroundColor: '#36A2EB'
          }]
        };
      }
    });
  }

  // Declare chart types
  public pieChartType: ChartType = 'pie';
  public barChartType: ChartType = 'bar';
  public pieChartData!: ChartData<'pie'>;
  public barChartData!: ChartData<'bar'>

  // Pie Chart Data
  // public pieChartData: ChartData<'pie'> = {
  //   labels: ['Rented', 'Reserved', 'Available'],
  //   datasets: [{
  //     data: [45, 25, 30],
  //     backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  //   }]
  // };

  // Bar Chart Data
  // public barChartData: ChartData<'bar'> = {
  //   labels: ['John Smith', 'Sarah Johnson', 'Mike Brown', 'Emma Davis', 'Tom Wilson'],
  //   datasets: [{
  //     label: 'Properties Assigned',
  //     data: [12, 19, 8, 15, 10],
  //     backgroundColor: '#36A2EB'
  //   }]
  // };

  // Chart Options
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };


}
