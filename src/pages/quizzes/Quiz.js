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



  const handleGuess = () => (
    props.setQuizAnswers (props.quizAnswers.map((answer, idx) => {
      return idx % 2 === 0 ? answer : {...answer, guessed: true}
    }))
  );

  return (
    <Row>
      <Col>
        <h1>{props.quizInfo.title}</h1>
        <p>{props.quizInfo.description}</p>
        <Row className='align-items-center justify-content-center'>
          <Col xs="auto">
            <Media className='align-items-center'>
              <Link to={`profiles/${props.quizInfo.profile_id}`}>
                <Avatar src={props.quizInfo.profile_image} height={80} />
              </Link>
              <Media.Body>
                <h2 className={styles.NoMargins}>Created by</h2>
                <p className={styles.NoMargins}>{props.quizInfo.owner}</p>
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
          <Col xs={6} className='pr-0'>
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className={styles.TableCol}>Hints</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{props.quizHints[6]}</td>
                  </tr>
                  <tr>
                    <td>Thornton</td>
                  </tr>
                  <tr>
                    <td>Larry</td>
                  </tr>
                </tbody>
            </Table>
          </Col>
          <Col xs={6} className='pl-0'>
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className={styles.TableCol}>Answers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{props.quizAnswers[0].guessed ? 'true' : 'false'}</td>
                  </tr>
                  <tr>
                    <td>{props.quizAnswers[1].guessed ? 'true' : 'false'}</td>
                  </tr>
                  <tr>
                    <td>{props.quizAnswers[2].guessed ? 'true' : 'false'}</td>
                  </tr>
                </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Quiz