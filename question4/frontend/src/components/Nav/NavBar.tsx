import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {
  blankUser,
  userListingContext,
} from "../../context/userListingContext";

export default function NavBar() {
  const { setShow, setUser } = useContext(userListingContext);
  return (
    <Navbar
      className="nav bg-body-tertiary justify-content-between"
      variant="dark"
      bg="dark"
      data-bs-theme="dark"
    >
      <Navbar.Brand>USERS</Navbar.Brand>
      <span>
        <Button
          variant="outline-primary"
          onClick={() => {
            setShow(true);
            setUser(blankUser);
          }}
          id="newUser"
        >
          New User
        </Button>
      </span>
    </Navbar>
  );
}
