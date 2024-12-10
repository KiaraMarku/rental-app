import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


interface MenuItem {
  label: string;
  route: string;
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 @Input() role!: string;
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService,
    private router:Router,
  ) {}

  ngOnInit() {
    this.menuItems = this.getMenuItems();
  }

  private getMenuItems(): MenuItem[] {
    switch(this.role) {
      case 'admin':
        return [
          { label: 'Dashboard', route: '/dashboard/admin' },
           { label: 'Register Agent', route: '/dashboard/admin/agent-register' },
          { label: 'Manage Agents', route: '/dashboard/admin/agents' },
          { label: 'Properties', route: '/dashboard/admin/properties' }
        ];
      case 'agent':
        return [
          { label: 'Dashboard', route: '/dashboard/agent' },
          { label: 'My Properties', route: '/dashboard/agent/properties' },
          { label: 'Reservations', route: '/dashboard/agent/reservations' }
        ];
      case 'customer':
        return [
          { label: 'Dashboard', route: '/dashboard/customer' },
          { label: 'Browse Properties', route: '/dashboard/customer/properties' },
          { label: 'My Reservations', route: '/dashboard/customer/reservations' }
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
