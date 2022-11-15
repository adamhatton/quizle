import React from 'react'
import Media from 'react-bootstrap/Media'

const QuizTile = ({ src, message }) => {

  return (
    <Media className='mt-5'>
    <img
        width={128}
        height={128}
        className="mr-3"
        src={src}
        alt={message}
    />
    <Media.Body>
        <h5>Quiz Title</h5>
        <p>Creator</p>
        <p>Likes: #</p>
    </Media.Body>
    </Media>
  )
}

export default QuizTile