import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';


interface DecodedToken {
  sub: string;      // username
  role: string;     // single role (e.g., 'ROLE_ADMIN')
  iat: number;      // issued at
  exp: number;      // expiration
}

export interface RegistrationData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private readonly API_URL = 'http://localhost:8080/auth';
   token=''
  private currentUserSubject = new BehaviorSubject<any>(null);

    constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token')!;
      if (this.token) {
        const userInfo = this.decodeToken(this.token);
        this.currentUserSubject.next(userInfo);
      }
    }
  }


  public getToken(){
    return this.token;
  }

  public getUser(){
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(`${this.API_URL}/login`, null, { params }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        const userInfo = this.decodeToken(response.token);
        this.currentUserSubject.next(userInfo);
      })
    );
  }



  private decodeToken(token: string): any {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return {
        username: decoded.sub,
        role: decoded.role
      };
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  getUserRole(): string | null {
    const user = this.currentUserSubject.value;
    if (user?.role) {
     
      if (user.role === 'ROLE_ADMIN') return 'admin';
      if (user.role === 'ROLE_AGENT') return 'agent';
      if (user.role === 'ROLE_CUSTOMER') return 'customer';
    }
    return null;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'ROLE_ADMIN';
  }

  isAgent(): boolean {
    return this.currentUserSubject.value?.role === 'ROLE_AGENT';
  }

  isCustomer(): boolean {
    return this.currentUserSubject.value?.role === 'ROLE_CUSTOMER';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  registerCustomer(data: RegistrationData): Observable<any> {
    return this.http.post(`${this.API_URL}/register/customer`, data);
  }

  registerAgent(data: RegistrationData): Observable<any> {
    return this.http.post(`${this.API_URL}/register/agent`, data);
  }


}
