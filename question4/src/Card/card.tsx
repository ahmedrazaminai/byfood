import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';

interface Props{
  id: string;
  user?: string;
  email?: string;
  setForm: (id:string) => void
}


function UsersCard(props:Props, key:string) {
  const handleForm = (e: React.MouseEvent) => {
    e.preventDefault();
    props.setForm(props.id)
  }

  return (
    <Card key={key}>
      <Card.Body className="d-grid gap-2">
        <Card.Title data-testid="usernamecard">{props.user}</Card.Title>
        <Card.Text data-testid="emailcard">{props.email}</Card.Text>
        <Button variant="primary" onClick={handleForm}>Edit User</Button>
      </Card.Body>
    </Card>
  );
}

export default UsersCard;