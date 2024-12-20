import { Injectable, PLATFORM_ID, Inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Client } from '../model/client';
import { Agent } from '../model/agent';


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
  token = ''
  private currentUserSubject = new BehaviorSubject<any>(null);
  private currentClientSubject = new BehaviorSubject<Client | null>(null);
  private currentAgentSubject = new BehaviorSubject<Agent | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token')!;
      if (this.token) {
        const userInfo = this.decodeToken(this.token);
        this.currentUserSubject.next(userInfo);
        // Load client info if user is a customer
        if (userInfo && userInfo.role === 'ROLE_CUSTOMER') {
          this.loadClientInfo(userInfo.username);
        }
        else if (userInfo && userInfo.role === 'ROLE_AGENT') {
          this.loadAgentInfo(userInfo.username);
        }
      }
    }
  }

  private loadClientInfo(username: string) {
    this.http.get<Client>('http://localhost:8080/api/clients/username/' + username)
      .subscribe({
        next: (client) => {
          this.currentClientSubject.next(client);
        },
        error: (error) => console.error('Error loading client:', error)
      });
  }

  private loadAgentInfo(username: string) {
    this.http.get<Agent>('http://localhost:8080/api/agents/username/' + username)
      .subscribe({
        next: (agent) => {
          this.currentAgentSubject.next(agent);
        },
        error: (error) => console.error('Error loading agent:', error)
      });
  }

  public getToken() {
    return this.token;
  }

  public getUser() {
    return this.currentUserSubject.value;
  }

  // Method to get current client value synchronously
  getClientValue(): Client | null {
    return this.currentClientSubject.value;
  }

  getAgentValue(): Agent | null {
    return this.currentAgentSubject.value;
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
        // Load client info if user is a customer
        if (userInfo && userInfo.role === 'ROLE_CUSTOMER') {
          this.loadClientInfo(userInfo.username);
        }
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
    this.currentClientSubject.next(null);
  }

  registerCustomer(data: RegistrationData): Observable<any> {
    return this.http.post(`${this.API_URL}/register/customer`, data);
  }

  registerAgent(data: RegistrationData): Observable<any> {
    return this.http.post(`${this.API_URL}/register/agent`, data);
  }

  getUserByUsername(username: String) {
    return this.http.get(this.API_URL + "/" + username);

  }




}
