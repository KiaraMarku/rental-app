import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation, ReservationRes } from '../model/reservation';
import { Rent } from '../model/rent';

@Injectable({
    providedIn: 'root'
})
export class RentService {

    private readonly API_URL = 'http://localhost:8080/api/rents';

    constructor(private http: HttpClient) { }


    createRent(rentData: { propertyId: any; clientId: any; rentStart: Date; rentEnd: Date; }) {
        return this.http.post(this.API_URL, rentData);
    }


    getRentsByClient(clientId: number): Observable<Rent[]> {
        return this.http.get<Rent[]>(`${this.API_URL}/client/${clientId}`);
    }

    getRentsByAgent(agentId: number): Observable<Rent[]> {
        return this.http.get<Rent[]>(`${this.API_URL}/client/${agentId}`);
    }

    deleteRent(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }




}
