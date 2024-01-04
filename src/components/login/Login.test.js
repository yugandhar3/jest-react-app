import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from './Login';

// Mock the entire axios module
jest.mock("axios", () => ({
    __esModule: true,

    default: {
        get: () => ({
            data: {
                "username": "yugandhar@arokee.com",
                "password": "Test@12345"
            },
        }),
    },
}));
describe('Login Component', () => {
    it('renders the login component', () => {
        render(<Login />);
        expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('handles input changes', () => {
        render(<Login />);
        fireEvent.change(screen.getByPlaceholderText('username'), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByPlaceholderText('password'), {
            target: { value: 'password123' },
        });
        expect(screen.getByPlaceholderText('username').value).toBe('testuser');
        expect(screen.getByPlaceholderText('password').value).toBe('password123');
    });

    it('login button is disabled when inputs are empty', () => {
        render(<Login />);
        expect(screen.getByText('Login')).toBeDisabled();
    });

    it('login button is enabled when inputs are filled', () => {
        render(<Login />);
        fireEvent.change(screen.getByPlaceholderText('username'), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByPlaceholderText('password'), {
            target: { value: 'password123' },
        });
        expect(screen.getByText('Login')).not.toBeDisabled();
    });

    it('shows success message on login success', async () => {
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText('username'), {
            target: { value: 'yugandhar@arokee.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('password'), {
            target: { value: 'Test@' },
        });

        fireEvent.click(screen.getByText('Login'));

        // Wait for the success message to appear
        await waitFor(() => {
            const successMessage = screen.getByTestId('success-message');
            expect(successMessage.textContent).toBe('Successfully login');
        });
    });
    it('shows error message on login failure due to incorrect credentials', async () => {
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText('username'), {
            target: { value: 'wronguser@arokee.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('password'), {
            target: { value: 'wrongpassword' },
        });

        fireEvent.click(screen.getByText('Login'));

        // Wait for the error message to appear
        await waitFor(() => {
            const errorMessage = screen.getByTestId('error');
            expect(errorMessage.textContent).toBe('Invalid credentials');
        });
    });

});
