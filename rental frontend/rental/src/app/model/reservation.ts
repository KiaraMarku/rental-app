import { Client } from "./client";
import { Property } from "./property";

export interface Reservation {
    id?: number;
    propertyId: number;
    clientId: number;
    reservedAt: Date;
    expiresAt: Date;
}

export interface ReservationRes {
    id: number;
    property: Property;
    client: Client;
    reservedAt: Date;
    expiresAt: Date;
}