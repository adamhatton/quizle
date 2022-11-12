import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom'
import styles from '../styles/NavBar.module.css';


const NavBar = () => {

  const loggedInIcons = (
    <>
      <NavLink
        to='/create'
        className={styles.NavLink}
        activeClassName={styles.Active}>
          Create
      </NavLink>
      <NavLink
        to='/profile'
        className={styles.NavLink}
        activeClassName={styles.Active}>
          Profile
      </NavLink>
      <NavLink
        to='/signout'
        className={styles.NavLink}>
          Sign Out
      </NavLink>
    </>
  )

  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}>
          Sign In
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}>
          Sign Up
      </NavLink>
    </>
  )

  return (
    <Navbar className={styles.NavBar} expand='md' fixed='top'>
      <Container>
        <NavLink to='/'>
          <Navbar.Brand>Quizle</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <NavLink
              to='/'
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}>
                Quizzes
            </NavLink>
            {loggedInIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar