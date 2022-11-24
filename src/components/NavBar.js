import React from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/Utils';
import styles from '../styles/NavBar.module.css';

/* Navigation bar component, core structure taken from
 Code Institute 'Moments' Walkthrough*/
const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  
  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  // Sign user out and set currentUser to null
  const handleSignOut = async () => {
    try{
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  // Links to be displayed when user is logged in
  const loggedInIcons = (
    <>
      <NavLink
        to='/quizzes/create'
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className='fas fa-plus' />
          Create
      </NavLink>
      <NavLink
        to='/'
        className={styles.NavLink}
        onClick={handleSignOut}
      >
        <i className='fas fa-sign-out-alt' />
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
  );

  // Links to be displayed when user is logged out
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className='fas fa-sign-in-alt' />
          Sign In
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className='far fa-user-circle' />
          Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand='md' fixed='top'>
      <Container>
        <NavLink to='/'>
          <Navbar.Brand className={styles.Logo}>Quizle</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
        ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls='basic-navbar-nav'
        />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <NavLink
              to='/'
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className='far fa-question-circle' />
                Quizzes
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;