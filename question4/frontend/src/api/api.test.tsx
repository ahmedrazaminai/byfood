import {
  createUsers,
  deleteUsers,
  getSingleUser,
  getUsers,
  updateUsers,
} from "./api";
import _ from "lodash";

let id: number;
let userLength: number;
let user = {
  id: 0,
  username: "test1",
  email: "test@test1.com",
  role: "admin",
  firstNames: "test1",
  lastName: "test1",
  bio: "test1",
};

test("createUsers returns a user object", async () => {
  await createUsers(user).then((res) => {
    id = res!;
    return res;
  });

  const getUser = await getSingleUser(id).then((res) => {
    return res;
  });
  expect(getUser.id).toBe(id);
});

test("updateUsers returns a user object", async () => {
  user = {
    id: id,
    username: "test2",
    email: "test@test2,com",
    role: "admin",
    firstNames: "test2",
    lastName: "test2",
    bio: "test2",
  };
  await updateUsers(user).then();
  const getUser = await getSingleUser(id).then((res) => {
    return res;
  });
  expect(_.isEqual(getUser, user)).toBeTruthy();
});

test("getUsers returns an array of users", async () => {
  const newUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const test = await getUsers().then((res) => {
    userLength = res.length;
    return res;
  });
  expect(_.pull(test, newUser)).toBeTruthy();
});

test("getSingleUser returns a user object", async () => {
  const test = await getSingleUser(id).then((res) => {
    return res;
  });
  expect(_.isEqual(test, user)).toBeTruthy();
});

test("delete the user", async () => {
  await deleteUsers(id).then();
  const test = await getUsers().then((res) => {
    return res.length;
  });
  expect(test).toBe(userLength - 1);
});
