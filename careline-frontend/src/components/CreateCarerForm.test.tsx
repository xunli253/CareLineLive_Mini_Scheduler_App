import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateCarerForm from './CreateCarerForm';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('CreateCarerForm', () => {
    it('renders input and button', () => {
        render(<CreateCarerForm />);
        expect(screen.getByLabelText(/carer name/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create carer/i })).toBeInTheDocument();
    });

    it('submits form and calls API', async () => {
        const postMock = vi.spyOn(axios, 'post').mockResolvedValue({});

        render(<CreateCarerForm />);
        fireEvent.change(screen.getByLabelText(/carer name/i), { target: { value: 'John' } });
        fireEvent.click(screen.getByRole('button', { name: /create carer/i }));

        await waitFor(() => {
            expect(postMock).toHaveBeenCalledWith('http://localhost:3000/carers', { name: 'John' });
        });
    });
});


