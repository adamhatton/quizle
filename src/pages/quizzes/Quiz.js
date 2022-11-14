import React, { useState } from 'react'
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
    ans_1,
    ans_2,
    ans_3,
    ans_4,
    ans_5,
    ans_6,
    ans_7,
    ans_8,
    ans_9,
    ans_10,
    is_owner,
    profile_id,
    profile_image,
    like_id,
    score_id,
  } = props;

  const hints = [
    props.hint_1,
    props.hint_2,
    props.hint_3,
    props.hint_4,
    props.hint_5,
    props.hint_6,
    props.hint_7,
    props.hint_8,
    props.hint_9,
    props.hint_10,
  ]

  const [answers, setAnswers] = useState({
    ans_1: ans_1,
    ans_2: ans_2,
    ans_3: ans_3,
    ans_4: ans_4,
    ans_5: ans_5,
    ans_6: ans_6,
    ans_7: ans_7,
    ans_8: ans_8,
    ans_9: ans_9,
    ans_10: ans_10,
  })

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
              //   onChange={handleChange}
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
                    <td>{hints[0]}</td>
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
                    <td>{answers.ans_1}</td>
                  </tr>
                  <tr>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>@twitter</td>
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