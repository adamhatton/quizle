import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

/* Form to edit a user comment. Taken from Code Institute 'Moments' walkthrough */
function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <Form
      className={`${styles.CommentForm} mt-3`}
      onSubmit={handleSubmit}
    >
      <Form.Group className="pr-1">
        <Form.Control
          className='mt-2'
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={`${btnStyles.Btn} ${btnStyles.CommentBtn}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className={`${btnStyles.Btn} ${btnStyles.CommentBtn}`}
          disabled={!content.trim()}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;