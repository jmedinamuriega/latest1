/* eslint-env jest */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductList from './ProductList';
import rootReducer from '../store';
import axiosInstance from '../api/axiosInstance';


jest.mock('../api/axiosInstance');

const store = configureStore({
  reducer: rootReducer,
});

describe('ProductList', () => {
  test('renders and filters products', async () => {
    axiosInstance.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: 'Middle pot',
          price: 29.99,
          category: 'Electronics',
          description: 'Description for Product 1',
          image: 'images/product1.jpg'
        },
        {
          id: 2,
          title: 'Middle pot',
          price: 19.99,
          category: 'Fashion',
          description: 'Description for Product 2',
          image: 'images/product2.jpg'
        },
        {
          id: 3,
          title: 'Middle pot',
          price: 39.99,
          category: 'Unknown',
          description: 'Description for Product 3',
          image: 'images/product3.jpg'
        }
      ]
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

 
    await waitFor(() => {
      const productElements = screen.getAllByText(/Middle pot/i);
      expect(productElements).toHaveLength(3); 
    });


    fireEvent.change(screen.getByPlaceholderText(/search for products by title/i), { target: { value: 'Middle pot' } });


    await waitFor(() => {
      const filteredProductElements = screen.getAllByText(/Middle pot/i);
      expect(filteredProductElements).toHaveLength(3); 
    });
  });
});
