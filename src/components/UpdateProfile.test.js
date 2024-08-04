/* eslint-env jest */
// import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import UpdateProfile from './UpdateProfile';

jest.mock('axios');

describe('UpdateProfile', () => {
  const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
  const loginMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  const renderComponent = () => {
    render(
      <AuthContext.Provider value={{ user: mockUser, login: loginMock }}>
        <UpdateProfile />
      </AuthContext.Provider>
    );
  };

  test('renders with initial user data and updates profile on form submission', async () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/username/i)).toHaveValue(mockUser.username);
    expect(screen.getByPlaceholderText(/email/i)).toHaveValue(mockUser.email);

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'new@example.com' } });

    axios.put.mockResolvedValueOnce({
      data: { user: { ...mockUser, username: 'newuser', email: 'new@example.com' } }
    });

    fireEvent.click(screen.getByText(/update profile/i));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        `http://localhost:5000/users/${mockUser.id}`,
        expect.objectContaining({
          username: 'newuser',
          email: 'new@example.com',
          password: ''
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    });

    expect(loginMock).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Profile updated successfully');
  });
});
