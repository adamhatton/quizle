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
    hint_1,
    hint_2,
    hint_3,
    hint_4,
    hint_5,
    hint_6,
    hint_7,
    hint_8,
    hint_9,
    hint_10,
    is_owner,
    profile_id,
    profile_image,
    like_id,
    score_id,
  } = props;

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
        <Table striped bordered hover>
            <thead>
              <tr>
                <th className={styles.TableCol}>Hints</th>
                <th className={styles.TableCol}>Answers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>Larry</td>
                <td>@twitter</td>
              </tr>
            </tbody>
        </Table>
        </Row>
      </Col>
    </Row>
  )
}

export default Quiz