import axios from 'axios';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import styles from '../../styles/SignInUpForm.module.css'
import btnStyles from '../../styles/Button.module.css'
import { setTokenTimestamp } from '../../utils/Utils';

/* State variables, handleChange(), handleSubmit() and error handling taken
 from Code Institute 'Moments' walkthrough project */
const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  useRedirect('loggedIn');

  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  })
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  // handleChange function uses computed property so all inputs can call it
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  // Submit login form data and redirect user to home page
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const {data} = await axios.post('/dj-rest-auth/login/', signInData);
        setCurrentUser(data.user);
        setTokenTimestamp(data);
        history.goBack();
    } catch(err){
        setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={`${styles.SignInUpForm} mt-5`}>
      <h1 className={`${styles.Heading} mb-4`}>Sign In</h1>

      <Form.Group controlId='username'>
        <Form.Label srOnly>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Username'
          name='username'
          value={username}
          className={styles.Input}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.username?.map((message, idx) =>
        <Alert variant="warning" key={idx}>{message}</Alert>
      )}


      <Form.Group controlId='password'>
        <Form.Label srOnly>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          className={styles.Input}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.password?.map((message, idx) =>
        <Alert variant="warning" key={idx}>{message}</Alert>
      )}

      <Button className={btnStyles.Btn} type='submit'>
        Submit
      </Button>

      {errors.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" key={idx} className="mt-3">
          {message}
        </Alert>
      ))}
    </Form>
  )
}

export default SignInForm