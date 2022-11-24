import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import CommentEditForm from "./CommentEditForm";
import Col from "react-bootstrap/Col";
import Media from "react-bootstrap/Media";
import styles from "../../styles/Comment.module.css";

/* Reusable component to show a user comment and profile Avatar.
Taken from Code Institute 'Moments' walkthrough */
const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setQuizInfo,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setQuizInfo((prevQuizInfo) => ({
            ...prevQuizInfo,
            comments_count: prevQuizInfo.comments_count - 1,
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Col className={styles.CommentCol}>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && (
            <MoreDropdown
              item='Comment'
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
        )}
      </Media>
    </Col>
    );
  };

export default Comment;