import { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Stack } from "react-bootstrap";
import {
  blankUser,
  userListingContext,
} from "../../context/userListingContext";
import { getSingleUser } from "../../api/api";
import "./profile.css";
import DeleteModal from "../modals/Delete";
import User from "../../models/model";

export default function UserProfile() {
  const { setUser, userId, setShow, close, setClose, updated, defaultImage } =
    useContext(userListingContext);

  const [tempUser, setTempUser] = useState<User>(blankUser);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [firstNames, setFirstNames] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (userId > 0) {
      getSingleUser(userId).then((data) => {
        setUsername(data.username);
        setEmail(data.email);
        setRole(data.role);
        setFirstNames(data.firstNames);
        setLastName(data.lastName);
        setBio(data.bio);
        setTempUser(data);
        setClose(false);
      });
    }
  }, [userId, updated]);

  useEffect(() => {
    setUser(blankUser);
  }, [close]);

  if (close) {
    return null;
  }

  return (
    <Col>
      <Stack gap={4} className="ms-auto profile-layout">
        <Button
          variant="secondary"
          onClick={() => setClose(true)}
          className="ms-auto btn-close"
        ></Button>
        <Image
          className="mx-auto"
          src={defaultImage}
          roundedCircle
          width="200"
          height="200"
        />
        <Stack className="text-center" gap={2}>
          <p className="heading">{username}</p>
          <p className="heading2">{role}</p>
          <Stack direction="horizontal" gap={2}>
            <p className="heading2">{firstNames}</p>
            <p className="heading2">{lastName}</p>
            <p className="heading2 ms-auto">{email}</p>
          </Stack>
          <p className="text-start">{bio}</p>
        </Stack>
        <Stack direction="horizontal" gap={0} className="ms-auto">
          <Button
            variant="secondary"
            onClick={() => {
              setShow(true);
              setUser(tempUser);
            }}
            className="edit"
          >
            Edit
          </Button>
          <DeleteModal username={tempUser.username} id={tempUser.id} />
        </Stack>
      </Stack>
    </Col>
  );
}
