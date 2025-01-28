import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation, ReservationRes } from '../model/reservation';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly API_URL = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) { }

  getReservationsByClient(clientId: number): Observable<ReservationRes[]> {
    return this.http.get<ReservationRes[]>(`${this.API_URL}/client/${clientId}`);
  }

  getReservationsByAgent(agentId: number): Observable<ReservationRes[]> {
    return this.http.get<ReservationRes[]>(`${this.API_URL}/client/${agentId}`);
  }

  getReservationClientsByAgent(agentId: number): Observable<Client[]> {
    return this.http.get<Client[]>(`http://localhost:8080/api/clients/reservation/agent/${agentId}`);
  }

  getAgentReservationsByClient(agentId: number, clientId: number): Observable<ReservationRes[]> {
    return this.http.get<ReservationRes[]>(`http://localhost:8080/api/reservations/client/${clientId}/agent/${agentId}`);
  }

  createReservation(reservationData: any): Observable<Reservation> {
    return this.http.post<Reservation>(this.API_URL, reservationData);
  }


  getPropertyReservation(propertyId: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.API_URL}/property/${propertyId}`);
  }

  cancelReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

}
