import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import styles from '../../styles/ProfileEdit.module.css';
import btnStyles from '../../styles/Button.module.css';
import MessageModal from "../../components/MessageModal";

/* Form for editing user's profile, core component taken from
Code Institute 'Moments' with amendments made */
const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();
  const componentMounted = useRef(true);

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    image: "",
  });
  const { name, bio, image } = profileData;

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  /* On mount if user owns profile get the profile data else redirect to homepage
  Method of checking if component is mounted taken from user Dzmitry Kulahin on:
  https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp */
  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, bio, image } = data;
          if (componentMounted.current){
            setProfileData({ name, bio, image });
          }
        } catch (err) {
          //console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();

    return () => {
        componentMounted.current = false;
    };
  }, [currentUser, history, id]);

  // Handle closing modal
  const handleClose = () => {
    setShow(false);
    history.goBack();
  };

  const handleShow = () => setShow(true);

  // handleChange function uses computed property so all inputs can call it
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  // Submit edited profile information to the database
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);

    if (imageFile?.current?.files[0]) {
      formData.append('image', imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      handleShow();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  // JSX for the form fields
  const textFields = (
    <>
      <Form.Group controlId='name'>
        <Form.Label className={styles.FormLabel}>
          Name
        </Form.Label>
        <Form.Control
          type='text'
          value={name}
          onChange={handleChange}
          name="name"
          rows={7}
        />
      </Form.Group>

      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId='bio'>
        <Form.Label className={styles.FormLabel}>
          Bio
        </Form.Label>
        <Form.Control
          as="textarea"
          value={bio}
          onChange={handleChange}
          name="bio"
          rows={7}
        />
      </Form.Group>

      {errors?.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
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
        type="submit">
        Save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}  className={`${styles.ProfileForm} mt-5`}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center">
          <Container>
            <Form.Group controlId='image-upload'>
              {image && (
                <Col xs='auto' className='mt-3 d-md-block d-none'>
                  <Avatar src={image} height={280} />
                </Col>
              )}
              {image && (
                <Col xs='auto' className='mt-3 d-md-none'>
                  <Avatar src={image} height={200} />
                </Col>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label className={`${styles.FormLabel} mt-3`}>
                  Change profile image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                className={styles.FileInput}
                onChange={(e) => {
                  if (e.target.files.length) {
                    URL.revokeObjectURL(image)
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div >{textFields}</div>
          </Container>
        </Col>
      </Row>
      <MessageModal 
        message='Profile has been updated!'
        show={show}
        handleClose={handleClose}
      />
    </Form>
  );
};

export default ProfileEditForm;