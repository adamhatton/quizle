import axios from 'axios';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import styles from '../../styles/SignInUpForm.module.css'

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  })
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('API Called')
      await axios.post('/dj-rest-auth/registration/', signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={`${styles.SignInUpForm} mt-5`}>
      <h1 className='mb-4'>Sign Up</h1>


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


      <Form.Group controlId='password1'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          name='password1'
          value={password1}
          className={styles.Input}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.password1?.map((message, idx) =>
        <Alert variant="warning" key={idx}>{message}</Alert>
      )}

      <Form.Group controlId='password2'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Confirm Password'
          name='password2'
          value={password2}
          className={styles.Input}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.password2?.map((message, idx) =>
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

export default SignUpForm