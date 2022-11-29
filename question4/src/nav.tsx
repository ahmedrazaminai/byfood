import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavbarTop() {
  return (
    <Container>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
}

export default NavbarTop;