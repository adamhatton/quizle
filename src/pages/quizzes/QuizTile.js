import React from 'react'
import Media from 'react-bootstrap/Media'
import { Link } from 'react-router-dom'

const QuizTile = ({ src, message, title, owner, likes_count, category, id }) => {

  return (
    <Link to={`/quizzes/${id}`}>
      <Media className='mt-5'>
        <img
            width={128}
            height={128}
            className="mr-3"
            src={src}
            alt={message}
        />
        <Media.Body>
            <h5>{title}</h5>
            <p>{owner}</p>
            <p>Likes: {likes_count}</p>
            <p>{category}</p>
        </Media.Body>
      </Media>
    </Link>
  )
}

export default QuizTile