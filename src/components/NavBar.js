import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// import { NavLink } from 'react-router-dom'
import styles from '../styles/NavBar.module.css';


const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand='md' fixed='top'>
      <Container>
        <Navbar.Brand>Quizle</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            {/* <NavLink>Quizzes</NavLink> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar