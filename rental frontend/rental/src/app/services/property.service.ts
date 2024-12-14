import { HttpClient } from "@angular/common/http";
import { Property } from "../model/property";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PropertyService {
    private readonly API_URL = 'http://localhost:8080/api/properties';

    constructor(private http: HttpClient) { }

    getAllProperties(): Observable<Property[]> {
        return this.http.get<Property[]>(this.API_URL);
    }

    getPropertyById(id: number): Observable<Property> {
        return this.http.get<Property>(`${this.API_URL}/${id}`);
    }

    addProperty(property: Property): Observable<Property> {
        return this.http.post<Property>(this.API_URL, property);
    }

    updateProperty(propertyData: Property): Observable<Property> {
        return this.http.put<Property>(`${this.API_URL}`, propertyData);
    }

    deleteProperty(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}