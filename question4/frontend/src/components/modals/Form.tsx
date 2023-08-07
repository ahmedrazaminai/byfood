import { useState, useEffect, useContext, useCallback } from "react";
import {
  blankUser,
  userListingContext,
} from "../../context/userListingContext";
import { updateUsers, createUsers } from "../../api/api";
import { Button, Modal, Form, Stack } from "react-bootstrap";

import "./Modal.css";

export default function UserForm() {
  const {
    userId,
    setUserId,
    show,
    setShow,
    user,
    updated,
    setUpdated,
    setUser,
  } = useContext(userListingContext);

  const [heading, setHeading] = useState("Create User");
  const [update, setUpdate] = useState(false);
  const [validated, setValidated] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [firstNames, setFirstNames] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (user != blankUser) {
      setUpdate(true);
      setHeading("Update " + user.username);
    } else {
      setHeading("Create User");
      setUpdate(false);
    }
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
    setFirstNames(user.firstNames);
    setLastName(user.lastName);
    setBio(user.bio);
  }, [show]);

  const updateUser: any = useCallback(() => {
    const id = userId;
    const updatedData = {
      id,
      username,
      email,
      role,
      firstNames,
      lastName,
      bio,
    };
    updateUsers(updatedData)
      .then(() => setUser(updatedData))
      .then(() => setUpdated(!updated));
  }, [userId, username, email, role, firstNames, lastName, bio]);

  const CreateUser = useCallback(() => {
    const usersData = { username, email, role, firstNames, lastName, bio };
    createUsers(usersData).then((data) => setUserId(data));
    console.log(userId);
  }, [username, email, role, firstNames, lastName, bio]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    update ? updateUser() : CreateUser();
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    setValidated(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit} validated={validated}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="role"
                placeholder="Enter role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Names</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="firstNames"
                placeholder="Enter first names"
                value={firstNames}
                onChange={(e) => setFirstNames(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <textarea
                className="form-control"
                id="bio"
                placeholder="Enter bio"
                value={bio}
                onChange={(e) => setBio(e.target.value ? e.target.value : "")}
              />
            </Form.Group>
            <hr />
            <Stack gap={0} direction="horizontal">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="ms-auto close"
              >
                Close
              </Button>
              <Button variant="primary" type="submit" className="btn-submit">
                {update ? "Save Changes" : "Create User"}
              </Button>
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
