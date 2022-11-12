import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../../styles/SignInUpForm.module.css'

const SignUpForm = () => {
  return (
    <Form className={`${styles.SignInUpForm} mt-5`}>
      <h1 className='mb-4'>Sign Up</h1>
      <Form.Group controlId='username'>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' placeholder='Username' name='username' className={styles.Input} />
      </Form.Group>

      <Form.Group controlId='password1'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' name='password1' className={styles.Input} />
      </Form.Group>

      <Form.Group controlId='password2'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type='password' placeholder='Confirm Password' name='password2' className={styles.Input} />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default SignUpForm