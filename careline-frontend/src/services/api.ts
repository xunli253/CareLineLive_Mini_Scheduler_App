import axios from 'axios';
import type { Carer, Client, Shift } from '../types';

const API_BASE = 'http://localhost:3000';

export const fetchCarers = () => axios.get<Carer[]>(`${API_BASE}/carers`);
export const fetchClients = () => axios.get<Client[]>(`${API_BASE}/clients`);
export const fetchShifts = (page = 1, limit = 10) => axios.get(`${API_BASE}/shifts?page=${page}&limit=${limit}`)


export const createShift = (data: {
    carerId: string;
    clientId: string;
    startTime: string;
    endTime: string;
}) => axios.post(`${API_BASE}/shifts`, data);

export const createCarers = (data: {
    name: string
}) => axios.post(`${API_BASE}/carers`, data);

export const createClient = (data: { name: string }) => axios.post(`${API_BASE}/clients`, data)