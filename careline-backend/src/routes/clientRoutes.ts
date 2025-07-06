import express from 'express';
import { clients } from '../db';
import { Client } from '../types';
import { randomUUID } from 'crypto';

const router = express.Router();

router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
        res.status(400).json({ message: 'Name is required' });
        return
    }

    const exists = clients.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        res.status(400).json({ message: 'Client with this name already exists' });
        return
    }

    const newClient: Client = { id: randomUUID(), name };
    clients.push(newClient);
    res.status(201).json(newClient);
});

router.get('/', (_req, res) => {
    res.json(clients);
});

export default router;