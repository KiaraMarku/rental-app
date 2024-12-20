import { Client } from "./client";
import { Property } from "./property";

// export interface Rent {
//     id?: number;
//     propertyId: number;
//     clientId: number;
//     rentStart: Date;
//     rentEnd: Date;
//     price:number;
// }

export interface Rent {
    id: number;
    property: Property;
    client: Client;
    rentStart: Date;
    rentEnd: Date;
    price: number;
}