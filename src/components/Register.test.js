import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axiosInstance from '../api/axiosInstance';  // Import your axiosInstance
import Register from './Register';

jest.mock('../api/axiosInstance');  // Mock axiosInstance

describe('Register', () => {
  test('registers a user', async () => {
    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password' } });

    axiosInstance.post.mockResolvedValueOnce({ data: { id: 1000, username: 'testuser', email: 'testuser@example.com' } });

    fireEvent.click(screen.getByText(/register/i));

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith('/users', {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password'
      });
    });
  });
});
