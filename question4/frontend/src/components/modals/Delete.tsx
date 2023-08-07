import { useState, useContext } from "react";
import { userListingContext } from "../../context/userListingContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUsers } from "../../api/api";

interface Props {
  username: string;
  id: number;
}

export default function DeleteModal({ username, id }: Props) {
  const { setUserId, setClose } = useContext(userListingContext);
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setShow(true)}>
        Delete
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete: {username} </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are your sure you want to delete the {username}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShow(false)}
            className="close"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              deleteUsers(id)
                .then(() => setShow(false))
                .then(() => setUserId(0))
                .then(() => setClose(true))
            }
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
