import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private readonly API_URL = 'http://localhost:8080/api/dashboard';

    constructor(private http: HttpClient) { }

    getPropertyStatistics(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/property-stats`);
    }

    getAgentPropertyCounts(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/agent-properties`);
    }
}