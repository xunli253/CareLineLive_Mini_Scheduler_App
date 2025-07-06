import { render, screen } from '@testing-library/react';
import ShiftForm from './ShiftForm';
import { describe, it, expect, vi } from 'vitest';


vi.mock('axios');

const mockCarers = [{ id: 'c1', name: 'Alice' }];
const mockClients = [{ id: 'p1', name: 'Bob' }];

describe('ShiftForm', () => {
    it('renders dropdowns and date picker', () => {
        render(<ShiftForm carers={mockCarers} clients={mockClients} />);
        expect(screen.getByLabelText(/carer/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/client/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/shift time range/i)).toBeInTheDocument();
    });

});