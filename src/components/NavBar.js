import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom'
import styles from '../styles/NavBar.module.css';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';


const NavBar = () => {
  const currentUser = useCurrentUser();

  const loggedInIcons = (
    <>
      <NavLink
        to='/create'
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i class="fas fa-plus"></i>
          Create
      </NavLink>
      <NavLink
        to='/signout'
        className={styles.NavLink}
        onClick={() => {}}
      >
        <i class="fas fa-sign-out-alt"></i>
          Sign Out
      </NavLink>
      <NavLink 
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text='Profile' />
      </NavLink>
    </>
  )

  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
          Sign In
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
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
              activeClassName={styles.Active}
            >
              <i class="far fa-question-circle"></i>
                Quizzes
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar