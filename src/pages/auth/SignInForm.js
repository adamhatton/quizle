import axios from 'axios';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import styles from '../../styles/SignInUpForm.module.css'

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  })
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('API Called')
      await axios.post('/dj-rest-auth/registration/', signInData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={`${styles.SignInUpForm} mt-5`}>
      <h1 className='mb-4'>Sign In</h1>

      <Form.Group controlId='username'>
        <Form.Label>Username</Form.Label>
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
        <Form.Label>Password</Form.Label>
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

      <Button variant='primary' type='submit'>
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