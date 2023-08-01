import { render, screen } from '@testing-library/react';
import UsersCard from './Card/card';


/**
 * @jest-environment jsdom
 */

console.log = jest.fn();


test('User card renders with text', () => {
  render(<UsersCard setForm={console.log} key="1" user="Test User" email="Test@User" id="s" />);
  
	const fullName = screen.getByTestId(/usernamecard/i);
	const role = screen.getByTestId(/emailcard/i);
  
	expect(fullName.textContent).toBe('Test User');
	expect(role.textContent).toBe('Test@User');
});


