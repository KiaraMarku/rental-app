import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('AuthGuard is triggered');
    const requiredRoles = route.data['roles'];
    const userRole = this.authService.getUser()?.role;
    console.log("Guard"+userRole);
    if (!userRole || (requiredRoles && !requiredRoles.includes(userRole))) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}