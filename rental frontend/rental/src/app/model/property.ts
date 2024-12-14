import { Agent } from "./agent";

export interface Property {
    id?: number;
    address: string;
    description: string;
    rent: number;
    contractDuration: number;
    agentId: number;
    base64Image?: string;
    agent?: Agent;
    status: string;
}