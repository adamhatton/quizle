import React from 'react';
import styles from '../styles/Avatar.module.css';

/* Reusable component to show user's Avatar, sized based on depending
on height that is passed. Taken from Code Institute 'Moments' walkthrough */
const Avatar = ({src, height = 40, text }) => {
  return (
    <span>
        <img className={styles.Avatar} src={src}
        height={height} width={height} alt="avatar" />
        {text}
    </span>
  );
};


export default Avatar;