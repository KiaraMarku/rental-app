import { HttpClient } from "@angular/common/http";
import { Agent } from "../model/agent";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AgentService {
    private readonly API_URL = 'http://localhost:8080/api/agents';

    constructor(private http: HttpClient) { }

    getAllAgents(): Observable<Agent[]> {
        return this.http.get<Agent[]>(this.API_URL);
    }

    getAgentById(id: number): Observable<Agent> {
        return this.http.get<Agent>(`${this.API_URL}/${id}`);
    }

    addAgent(agent: Agent): Observable<Agent> {
        return this.http.post<Agent>(this.API_URL, agent);
    }

    updateAgent(agent: Agent): Observable<Agent> {
        return this.http.put<Agent>(`${this.API_URL}`, agent);
    }

    deleteAgent(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}