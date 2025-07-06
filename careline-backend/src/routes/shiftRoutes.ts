import express from 'express';
import { shifts, carers, clients } from '../db';
import { Shift } from '../types';
import { randomUUID } from 'crypto';

const router = express.Router();

router.post('/', (req, res) => {
    const { carerId, clientId, startTime, endTime } = req.body;

    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);

    const conflict = shifts.find(s =>
        s.carerId === carerId &&
        new Date(s.startTime) < newEnd &&
        new Date(s.endTime) > newStart
    );

    if (conflict) {
        res.status(400).json({ message: 'Carer already has a shift that overlaps.' });
        return;
    }

    const newShift: Shift = {
        id: randomUUID(),
        carerId,
        clientId,
        startTime,
        endTime,
    };

    shifts.push(newShift);
    res.status(201).json(newShift);
});

router.get('/', (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const enriched = shifts.map(s => ({
        ...s,
        carer: carers.find(c => c.id === s.carerId),
        client: clients.find(c => c.id === s.clientId),
    }));

    const paginated = enriched.slice(startIndex, endIndex);

    res.json({
        total: enriched.length,
        page,
        limit,
        data: paginated,
    });
});

export default router;