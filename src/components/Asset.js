import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Asset.module.css";

/* Reusable component to show loading spinner, icons and messages
depending on what is passed. Core component taken from Code Institute
'Moments' walkthrough, but amendments have been made */
const Asset = ({ spinner, message, question }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {question && <i className={`${styles.Icon} far fa-question-circle`}></i>}
      {message && <p className={`${styles.Text} mt-4`}>{message}</p>}
    </div>
  );
};

export default Asset;