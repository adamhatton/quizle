import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Avatar from "../../components/Avatar";
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

/* Form to create and post a user comment.
Taken from Code Institute 'Moments' walkthrough */
function CommentCreateForm(props) {
  const { quiz, setQuizInfo, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post('/comments/', {
        content,
        quiz,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setQuizInfo((prevQuizInfo) => ({
            ...prevQuizInfo,
            comments_count: prevQuizInfo.comments_count + 1,
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      className={`${styles.CommentForm} mt-3`}
      onSubmit={handleSubmit}
    >
      <Form.Group controlId='comment'>
        <InputGroup className='align-items-center'>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Label srOnly>Enter a comment:</Form.Label>
          <Form.Control 
            placeholder='Add a comment...'
            as='textarea'
            name='comment'
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${btnStyles.Btn} ${btnStyles.CommentBtn} d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        Post
      </button>
    </Form>
  );
}

export default CommentCreateForm;