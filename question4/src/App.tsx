import React, { useEffect, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import UsersCard from './Card/card';
import UserForm from './Form/form';
import NavbarTop from './nav';
import { getUsers } from './api/api';

interface User{
  id: string;
  username?: string;
  email?: string;
  password?: string;
}


export default function Home() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState("")
  const [user, setUser] = useState([])


  
  const handleGetUsers = async () => await getUsers().then((data) => setUser(data?.reverse()));
  
  useEffect(() => {
    getUsers().then((data) => setUsers(data?.reverse()));
  },[user]);
  // let users = 
  // console.log(users)

  return (
    <div className={"container"}>
      <NavbarTop />
        <Container className='main'>
          <div  className="col1">
            {users?.map((user:User) => (
              <UsersCard key={user.id} id={user.id} user={user.username} email={user.email} setForm={setForm}/>
              ))}
          </div>
          <div className="col2">
            {form? <UserForm getUsers={handleGetUsers} users={users} setForm={setForm} id={form}/> : <UserForm getUsers={handleGetUsers} users={users} setForm={setForm}/>}
          </div>
      </Container>
  
      <footer className={"footer"}>
        <span>
        {/* <hr /> */}
          Ahmed Raza
        </span>
      </footer>
    </div>
  )
}
