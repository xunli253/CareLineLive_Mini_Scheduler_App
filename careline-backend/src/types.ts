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
    carerId: string;
    clientId: string;
    startTime: string; // ISO string
    endTime: string;
}