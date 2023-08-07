export interface ListUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default interface User extends ListUser {
  bio: string;
  firstNames: string;
  lastName: string;
}

export interface CreateUser extends Omit<User, "id"> {}
