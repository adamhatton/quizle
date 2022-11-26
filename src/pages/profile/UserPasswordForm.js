import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/UsernamePasswordForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import MessageModal from "../../components/MessageModal";

/* Form for editing user's password, core component taken from
Code Institute 'Moments' with amendments made */
const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: '',
    new_password2: '',
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Handle closing modal
  const handleClose = () => {
    setShow(false);
    history.goBack();
  };
  
  const handleShow = () => setShow(true);

  // Submit new password to the database
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      handleShow();
    } catch (err) {
      //console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={`${styles.UsernameForm} mt-5`}>
      <h1 className={`${styles.Heading} mb-3`}>Change Password</h1>
      <Form.Group controlId='new_password1'>
        <Form.Label srOnly>New password</Form.Label>
          <Form.Control
            placeholder="New password"
            type="password"
            value={new_password1}
            className={styles.Input}
            onChange={handleChange}
            name="new_password1"
            />
      </Form.Group>
        {errors?.new_password1?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
      <Form.Group controlId='new_password2'>
        <Form.Label srOnly>Confirm password</Form.Label>
          <Form.Control
            placeholder="Confirm new password"
            type="password"
            value={new_password2}
            className={styles.Input}
            onChange={handleChange}
            name="new_password2"
            />
      </Form.Group>
        {errors?.new_password2?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
      <Button
        className={btnStyles.Btn}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button
        className={btnStyles.Btn}
        type="submit"
      >
        Save
      </Button>
      <MessageModal 
        message='Password has been updated!'
        show={show}
        handleClose={handleClose}
      />
    </Form>
  );
};

export default UserPasswordForm;