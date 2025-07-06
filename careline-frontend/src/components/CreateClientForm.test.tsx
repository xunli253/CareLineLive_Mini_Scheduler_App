import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateClientForm from './CreateClientForm';
import axios from 'axios';
import { describe, it, expect, vi } from 'vitest';

vi.mock('axios');

describe('CreateClientForm', () => {
    it('renders input and button', () => {
        render(<CreateClientForm />);
        expect(screen.getByLabelText(/client name/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create client/i })).toBeInTheDocument();
    });

    it('submits form and calls API', async () => {
        const mockPost = vi.spyOn(axios, 'post').mockResolvedValue({});

        render(<CreateClientForm />);
        fireEvent.change(screen.getByLabelText(/client name/i), { target: { value: 'Bob' } });
        fireEvent.click(screen.getByRole('button', { name: /create client/i }));

        await waitFor(() => {
            expect(mockPost).toHaveBeenCalledWith('http://localhost:3000/clients', { name: 'Bob' });
        });
    });

    it('shows field error when name is missing', async () => {
        render(<CreateClientForm />);
        fireEvent.click(screen.getByRole('button', { name: /create client/i }));

        await waitFor(() => {
            expect(screen.getByText(/please enter client name/i)).toBeInTheDocument();
        });
    });
});