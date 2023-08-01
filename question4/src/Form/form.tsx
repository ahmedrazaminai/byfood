import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Placeholder from 'react-bootstrap/Placeholder';
import DeleteModal from '../alert';
import {createUsers, updateUsers, getSingleUser, deleteUsers} from '../api/api';
import {useRef, useState, useEffect} from 'react';

interface Props{
  id?: any;
  user?: any;
  email?: string;
  password?: string;
  getUsers: () => void;
  users: any
  setForm: (e:any) => void;

}


export default function UserForm (props:Props) {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: ""
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  
  const handleUser = (e: React.FormEvent, func:any) => {
    e.preventDefault();
    func({
      id: props.id,
      user: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    });
    props.getUsers();
    props.setForm("")
  }
  
  const handleDeleteUser = (e: React.FormEvent) => {
    e.preventDefault();
    deleteUsers(props.id);
    props.getUsers();
    props.setForm("")
    setUser({
      email: "",
      username: "",
      password: ""
    });
  };


  useEffect(() => {
    props.id ? getSingleUser(props.id).then((data) => setUser(data)) : setUser({
      email: "",
      username: "",
      password: ""
    });
    emailRef.current!.value = user.email;
    usernameRef.current!.value = user.username;
    passwordRef.current!.value = user.password;
  }, [props.id, user.email]);

  return (
    <Form onSubmit={(e) => {props.id ? handleUser(e, updateUsers) : handleUser(e, createUsers)}} className="justify-content-end">
      <h3>{props.id? `Edit ${user.username}` : "Add new"}</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control ref={emailRef} type="email" placeholder="Enter email" defaultValue={user.email} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control data-testid="username" ref={usernameRef} type="text" placeholder="Enter Username" defaultValue={user.username} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control data-testid="password" ref={passwordRef} type="password" placeholder="Password" defaultValue={user.password} required/>
      </Form.Group>

      <div className="d-grid gap-2">
        <Button data-testid="submit" variant="primary" type="submit">{props.id? "Save" : "Submit"}</Button>
        {
          props.id ?
          <ButtonGroup aria-label="Basic example">
            <Button variant="outline-secondary" onClick={() => {props.setForm("")}}>Cancel</Button>
            <DeleteModal user={user.username} id={props.id} handleDelete={handleDeleteUser} />
          </ButtonGroup>
          :
          <ButtonGroup aria-label="Basic example">
            <Placeholder.Button variant="light" aria-hidden="true" />
          </ButtonGroup>
        }
      </div>
    </Form>
  );
}