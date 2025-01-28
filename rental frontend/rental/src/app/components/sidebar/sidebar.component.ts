import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  icon?: string;
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatListModule, MatButtonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() role!: string;
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.menuItems = this.getMenuItems();
  }

  private getMenuItems(): MenuItem[] {
    switch (this.role) {
      case 'admin':
        return [
          { label: 'Dashboard', route: '/dashboard/admin', icon: 'space_dashboard' },
          { label: 'Register Agent', route: '/dashboard/admin/agent-register', icon: 'person_add' },
          { label: 'Manage Agents', route: '/dashboard/admin/agents', icon: 'groups' },
          { label: 'Properties', route: '/dashboard/admin/properties', icon: 'real_estate_agent' }
        ];
      case 'agent':
        return [
          { label: 'My Properties', route: '/dashboard/agent/properties', icon: 'villa' },
          { label: 'Reservations', route: '/dashboard/agent/reservations', icon: 'schedule' },
          { label: 'My Rents', route: '/dashboard/agent/rents', icon: 'apartment' }
        ];
      case 'customer':
        return [
          { label: 'Browse Properties', route: '/dashboard/customer/properties', icon: 'villa' },
          { label: 'My Reservations', route: '/dashboard/customer/reservations', icon: 'schedule' },
          { label: 'My Rents', route: '/dashboard/customer/rents', icon: 'apartment' }
        ];
      default:
        return [];
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
