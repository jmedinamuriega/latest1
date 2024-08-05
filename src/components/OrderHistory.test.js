/* eslint-env jest */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import OrderHistory from './OrderHistory';
import { OrderContext } from '../contexts/OrderContext';
import '@testing-library/jest-dom'; 

const mockStore = configureStore([]);

describe('OrderHistory with Context', () => {
  test('renders and shows order details', async () => {
    const orders = [
      { id: 1, date_created: '2024-08-01', totalPrice: 100, additionalDetails: 'Details 1' },
      { id: 2, date_created: '2024-08-02', totalPrice: 200, additionalDetails: 'Details 2' },
    ];

    render(
      <Provider store={mockStore({})}>
        <OrderContext.Provider value={{ orders }}>
          <OrderHistory />
        </OrderContext.Provider>
      </Provider>
    );

    expect(await screen.findByText(/order history/i)).toBeInTheDocument();
    expect(screen.getByText(/Order ID: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Order ID: 2/i)).toBeInTheDocument();
  });
});
