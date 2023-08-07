import User, { CreateUser, ListUser } from "../models/model";

const BASE_URL = "http://127.0.0.1:8080/users/";

export const getUsers = async () =>
  await fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) =>
      data.map((user: ListUser) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      }))
    );

export const getSingleUser = async (id: number) =>
  fetch(`${BASE_URL}${id}`)
    .then((res) => res.json())
    .then((user: User) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      firstNames: user.firstNames,
      lastName: user.lastName,
      bio: user.bio,
    }));

export const deleteUsers = async (id: number) =>
  fetch(`${BASE_URL}${id}`, { method: "DELETE" }).then((res) => res.status);

export const createUsers = async (user: CreateUser) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
      firstNames: user.firstNames,
      lastName: user.lastName,
    }),
  }).then((res) => res.json());

export const updateUsers = async (user: User) =>
  fetch(`${BASE_URL}${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
      firstNames: user.firstNames,
      lastName: user.lastName,
    }),
  }).then((res) => res.status);
