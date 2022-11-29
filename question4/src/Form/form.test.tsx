import React from 'react';
import { render, screen } from '@testing-library/react';
// import App from './App';
// import UsersCard from './Card/card';
import UserForm from './form';
import { act } from 'react-dom/test-utils';
import { createUsers, getUsers, deleteUsers } from '../api/api';
import "@testing-library/jest-dom/extend-expect";



var idd = ""
var func = jest.fn();

test('Edit user', async () => {
  await createUsers({ user:"moo", email:"moo@sd.com", password: "moopass" }).then((data) => idd = data)
  // // .then((data) => {s["users"] = data?.reverse()})// expect(user.length).toBeGreaterThanOrEqual(1)

  
  
  // let idd = "1c51894c-9578-44d9-853c-bdd64ab207db"

  screen.findByText('moo', undefined, { timeout: 5000 }).then((data) => {
    expect(data).toBe('moo')})

  screen.findByText('moo@sd.com', undefined, { timeout: 5000 }).then((data) => {
    expect(data).toBeInTheDocument()})

  screen.findByText('moopass', undefined, { timeout: 5000 }).then((data) => {
    expect(data).toBeInTheDocument()})

  await deleteUsers(idd)
});
