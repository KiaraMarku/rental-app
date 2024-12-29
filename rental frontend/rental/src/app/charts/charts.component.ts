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
  // Declare chart types
  public pieChartType: ChartType = 'pie';
  public barChartType: ChartType = 'bar';

  // Pie Chart Data
  public pieChartData: ChartData<'pie'> = {
    labels: ['Rented', 'Reserved', 'Available'],
    datasets: [{
      data: [45, 25, 30],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  // Bar Chart Data
  public barChartData: ChartData<'bar'> = {
    labels: ['John Smith', 'Sarah Johnson', 'Mike Brown', 'Emma Davis', 'Tom Wilson'],
    datasets: [{
      label: 'Properties Assigned',
      data: [12, 19, 8, 15, 10],
      backgroundColor: '#36A2EB'
    }]
  };

  // Chart Options
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor() { }

  ngOnInit(): void { }
}
