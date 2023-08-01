import { render, screen } from '@testing-library/react';
import { createUsers, getUsers, deleteUsers } from '../api/api';
import "@testing-library/jest-dom/extend-expect";


var idd = ""
var func = jest.fn();

test('Edit user', async () => {
  await createUsers({ user:"moo", email:"moo@sd.com", password: "moopass" }).then((data) => idd = data)

  screen.findByText('moo', undefined, { timeout: 5000 }).then((data) => {
    expect(data).toBe('moo')})

  screen.findByText('moo@sd.com', undefined, { timeout: 5000 }).then((data) => {
    expect(data).toBeInTheDocument()})

  screen.findByText('moopass', undefined, { timeout: 5000 }).then((data) => {
    expect(data).toBeInTheDocument()})

  await deleteUsers(idd)
});
