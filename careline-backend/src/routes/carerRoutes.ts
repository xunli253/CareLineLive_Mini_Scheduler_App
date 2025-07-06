import express from 'express';
import { carers } from '../db';
import { Carer } from '../types';
import { randomUUID } from 'crypto';

const router = express.Router();

router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
        res.status(400).json({ message: 'Name is required' });
        return
    }

    const exists = carers.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        res.status(400).json({ message: 'Carer with this name already exists' });
        return
    }

    const newCarer: Carer = { id: randomUUID(), name };
    carers.push(newCarer);
    res.status(201).json(newCarer);
});

router.get('/', (_req, res) => {
    res.json(carers);
});

export default router;