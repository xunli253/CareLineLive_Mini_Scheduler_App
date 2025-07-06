export interface Carer {
    id: string;
    name: string;
}

export interface Client {
    id: string;
    name: string;
}

export interface Shift {
    id: string;
    carer: Carer;
    client: Client;
    startTime: string; // ISO string
    endTime: string;
}