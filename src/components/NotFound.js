import React from 'react';
import NoResults from "../assets/no-results.png";
import styles from '../styles/NotFound.module.css';

/* Component for displaying a 404 error */
const NotFound = () => {
  return (
    <div className={`${styles.ImgContainer}`}>
        <img
            src={NoResults}
            className={styles.NotFound}
            alt='A robot malfunctioning'
        />
        <p className={styles.NotFoundPara}>How did we get here?</p>
        <p className={styles.NotFoundPara}>The page you're looking for doesn't exist</p>
        <p className={styles.ImgLink}>
          <a href="https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_7967793.htm#query=404%20not%20found&position=15&from_view=search&track=sph">
            Image by storyset
          </a> on Freepik
        </p>
    </div>
  );
};

export default NotFound;