// src/app/layouts/dashboard-layout/dashboard-layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";


type UserRole = 'admin' | 'agent' | 'customer';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  
  constructor(public authService: AuthService) {}
  user=this.authService.getUser();
  get role(){
    return this.authService.getUserRole()!;
  }

  get username(){
    return this.user?.username;
  }


  private isValidRole(role: string): role is UserRole {
    return ['admin', 'agent', 'customer'].includes(role);
  }
}