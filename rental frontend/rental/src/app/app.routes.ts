// Updated app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/customer-register/customer-register.component')
      .then(m => m.CustomerRegisterComponent)
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
        children: [
            {
            path: 'agent-register',
            loadComponent: () => import('./components/admin/agent-register/agent-register.component')
              .then(m => m.AgentRegisterComponent)
          },
          // {
          //   path: 'agents',
          //   loadComponent: () => import('./components/admin/agent-management/agent-management.component')
          //     .then(m => m.AgentManagementComponent)
          // },
          // {
          //   path: 'properties',
          //   loadComponent: () => import('./components/admin/property-management/property-management.component')
          //     .then(m => m.PropertyManagementComponent)
          // }
        ]
      },
      {
        path: 'agent',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_AGENT'] },
        children: [
          // {
          //   path: 'properties',
          //   loadComponent: () => import('./components/agent/agent-properties/agent-properties.component')
          //     .then(m => m.AgentPropertiesComponent)
          // },
          // {
          //   path: 'reservations',
          //   loadComponent: () => import('./components/agent/agent-reservations/agent-reservations.component')
          //     .then(m => m.AgentReservationsComponent)
          // }
        ]
      },
      {
        path: 'customer',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] },
        children: [
          // {
          //   path: 'properties',
          //   loadComponent: () => import('./components/customer/property-browse/property-browse.component')
          //     .then(m => m.PropertyBrowseComponent)
          // },
          // {
          //   path: 'reservations',
          //   loadComponent: () => import('./components/customer/customer-reservations/customer-reservations.component')
          //     .then(m => m.CustomerReservationsComponent)
          // }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];