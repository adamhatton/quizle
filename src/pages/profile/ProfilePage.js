import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Media from 'react-bootstrap/Media'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Avatar from '../../components/Avatar'

const ProfilePage = () => {
  return (
    <>
      <Row>
        <Col>
          <Media className='mt-5'>
            <Avatar src={image} height={240} />
            <Media.Body>
                <Row>
                  <h2>{owner}</h2>
                  <p>3 dots</p>
                </Row>
                <p>Name: {name}</p>
                <p>Bio:</p>
                <p>{bio}</p>
            </Media.Body>
          </Media>
        </Col>
      </Row>
      <Row>
        <Col>
          <i className='far fa-check-circle'></i>
          <p>Completed quizzes: {completed_quizzes_count ? completed_quizzes_count : 0}</p>
        </Col>
      </Row>
      <Row>
        <ButtonGroup aria-label='Quizzes created and quizzes completed selector' className='d-md-block d-none'>
            <Button variant='info'>All</Button>
            <Button variant='info'>Sport</Button>
        </ButtonGroup>
      </Row>
    </>
  )
}

export default ProfilePage