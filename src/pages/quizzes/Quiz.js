import React from 'react'
import Media from 'react-bootstrap/Media';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom';
import styles from '../../styles/Quiz.module.css'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

const Quiz = (props) => {

  const {
    id,
    owner,
    title,
    description,
    category,
    time_limit_seconds,
    created_on,
    updated_on,
    is_owner,
    profile_id,
    profile_image,
    like_id,
    score_id,
    setQuizInfo,
    quizAnswers,
    setQuizAnswers,
  } = props;

  const handleGuess = () => (
    props.setQuizAnswers (props.quizAnswers.map((answer, idx) => {
      return idx % 2 === 0 ? answer : {...answer, guessed: true}
    }))
  );

  return (
    <Row>
      <Col>
        <h1>{title}</h1>
        <p>{description}</p>
        <Row className='align-items-center justify-content-center'>
          <Col xs="auto">
            <Media className='align-items-center'>
              <Link to={`profiles/${profile_id}`}>
                <Avatar src={profile_image} height={80} />
              </Link>
              <Media.Body>
                <h2 className={styles.NoMargins}>Created by</h2>
                <p className={styles.NoMargins}>{owner}</p>
              </Media.Body>
            </Media>
          </Col>
          <Col xs="auto">
            <i className={`${styles.NotCompleted} far fa-times-circle`}></i>
          </Col>
          <Col xs="auto">
            <h2 className={styles.NoMargins}>High Score</h2>
            <p className={styles.NoMargins}>You haven't completed this quiz yet!</p>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Form.Group controlId='guess_input'>
            <Form.Label srOnly>Guess:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Guess'
              name='title'
              //   value={title}
              //   className={styles.Input}
                onChange={handleGuess}
            />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <p>Timer</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className={styles.TableCol}>Hints</th>
                    <th>Answers</th>
                  </tr>
                </thead>
                <tbody>
                  { quizAnswers.map((answer) => 
                    <tr key={answer.id}>
                      <td className='text-break'>{answer.hint}</td>
                      <td className='text-break'>{answer.guessed ? answer.value : '-'}</td>
                    </tr>
                  )}
                </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Quiz