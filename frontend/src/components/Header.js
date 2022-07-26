import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar
        bg='light'
        /* or bg='dark' variant='dark */ expand='lg'
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand href='/'>Let's play a game</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/cart'>
                <i className='fas fa-cart-shopping'></i>Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <i className='fas fa-solid fa-user'></i>Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
