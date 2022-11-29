import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import UsersCard from './Card/card';
import UserForm from './Form/form';
import Home from './App';
import { act } from 'react-dom/test-utils';
import { getUsers } from './api/api';


/**
 * @jest-environment jsdom
 */


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

console.log = jest.fn();


test('User card renders with text', () => {
  render(<UsersCard setForm={console.log} key="1" user="Test User" email="Test@User" id="s" />);
  
	const fullName = screen.getByTestId(/usernamecard/i);
	const role = screen.getByTestId(/emailcard/i);
  
	expect(fullName.textContent).toBe('Test User');
	expect(role.textContent).toBe('Test@User');
});


