import React, { createContext, useEffect, useState } from "react";
import { getUsers } from "../api/api";
import User from "../models/model";

export const userListingContext = createContext<any>([]);
export const blankUser = {
  id: 0,
  username: "",
  email: "",
  role: "",
  bio: "",
  firstNames: "",
  lastName: "",
};

type Props = {
  children: React.ReactNode;
};

export const UserListingProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<User>(blankUser);
  const [userId, setUserId] = useState<number>(0);

  const [show, setShow] = useState<boolean>(false);
  const [close, setClose] = useState(true);
  const [updated, setUpdated] = useState(false);

  const defaultImage =
    "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg";

  const fetchUsers = async () => {
    const userss = await getUsers();
    setUsers(userss);
  };

  useEffect(() => {
    fetchUsers();
  }, [userId, user]);

  return (
    <userListingContext.Provider
      value={{
        users,
        user,
        setUser,
        show,
        setShow,
        userId,
        setUserId,
        close,
        setClose,
        updated,
        setUpdated,
        defaultImage,
      }}
    >
      {children}
    </userListingContext.Provider>
  );
};
