import React from 'react';
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom';
import tileStyles from '../../styles/QuizTile.module.css';

/* Component for obtaining core quiz details and display in a tile format */
const QuizTile = ({ src, message, title, owner, likes_count, category, id }) => {

  return (
    <Link to={`/quizzes/${id}`}>
      <Media className={`${tileStyles.QuizTile} align-items-center text-center`}>
        <img
            width={128}
            height={128}
            className={`${tileStyles.Image} ml-1 mr-1`}
            src={src}
            alt={message}
        />
        <Media.Body>
            <h5 className={`${tileStyles.QuizTitle} text-break`}>{title}</h5>
            <hr className={tileStyles.Rule} />
            <p className={`${tileStyles.QuizSmallText} text-break`}>Creator: {owner}</p>
            <p className={tileStyles.QuizSmallText}>Likes: {likes_count}</p>
            <p className={tileStyles.Category}>{category}</p>
        </Media.Body>
      </Media>
    </Link>
  );
};

export default QuizTile;