import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import styles from '../../styles/UsernamePasswordForm.module.css'
import btnStyles from '../../styles/Button.module.css'
import MessageModal from "../../components/MessageModal";

/* Form for editing user's username, core component taken from
Code Institute 'Moments' with amendments made */
const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Set username on mount to prepopulate form field
  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Handle closing modal
  const handleClose = () => {
    setShow(false);
    history.goBack();
  }
  const handleShow = () => setShow(true);

  // Submit new username to the database
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      handleShow();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={`${styles.UsernameForm} mt-5`}>
      <h1 className={`${styles.Heading} mb-3`}>Change Username</h1>
      <Form.Group controlId='username'>
        <Form.Label srOnly>Change username</Form.Label>
        <Form.Control
        placeholder='Username'
        type='text'
        value={username}
        name='username'
        className={styles.Input}
        onChange={(event) => setUsername(event.target.value)}
      />
      </Form.Group>
        {errors?.username?.map((message, idx) => (
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
        message='Username has been updated!'
        show={show}
        handleClose={handleClose}
      />
    </Form>
  );
};

export default UsernameForm;