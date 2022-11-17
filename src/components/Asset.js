import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, message, question }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {question && <i className='far fa-question-circle'></i>}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;