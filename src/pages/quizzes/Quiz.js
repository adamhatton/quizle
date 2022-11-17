import React from 'react'
import Media from 'react-bootstrap/Media';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Avatar from '../../components/Avatar';
import { Link, useHistory } from 'react-router-dom';
import styles from '../../styles/Quiz.module.css'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MoreDropdown from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';

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
    likes_count,
    completed_count,
    setQuizInfo,
    quizAnswers,
    setQuizAnswers,
  } = props;

  const history = useHistory();

  const handleEdit = () => {
    history.push(`/quizzes/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/quizzes/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleGuess = (event) => {
      const formattedGuess = event.target.value.trim().toLowerCase();
      setQuizAnswers (quizAnswers.map(answer => {
      const formattedAnswer = answer.value.trim().toLowerCase();
      if (formattedGuess === formattedAnswer && !answer.guessed) {
        event.target.value = '';
        return {...answer, guessed: true}
      } else {
        return {...answer}
      } 
    }))
  };

  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col className='d-flex'>
              <h1>{title}</h1>
              <MoreDropdown
                item='Quiz'
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </Col>
          </Row>        
          <p>{description}</p>
        </Col>
      </Row>
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
              onKeyUp={handleGuess}
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
          <Button>Start!</Button>
        </Col>
      </Row>
    </>
  )
}

export default Quiz