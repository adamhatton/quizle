import React, { useEffect, useState } from 'react'
import Media from 'react-bootstrap/Media';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Avatar from '../../components/Avatar';
import { Link, useHistory } from 'react-router-dom';
import styles from '../../styles/Quiz.module.css'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Timer from '../../components/Timer';

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

  const [quizActive, setQuizActive] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [seconds, setSeconds] = useState(time_limit_seconds);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const history = useHistory();

  useEffect(() => {
    const handleCompleted = () => {
      const guessedAnswers = quizAnswers.reduce((acc, cur) => {
        return cur.guessed === true ? acc + 1 : acc
      }, 0);
      const allGuessed = guessedAnswers === 10 ? true : false;
      if (allGuessed) {
        setCompleted(true);
        setQuizActive(false);
      }
    }

    handleCompleted();
  }, [quizAnswers])

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

  const handleGiveUp = () => {
    setGiveUp(true);
    setQuizActive(false);
    setQuizAnswers(quizAnswers.map(answer => {
      return {...answer, guessed: true}
    }))
  }

  const handleReset = () => {
    setQuizActive(false);
    setGiveUp(false);
    setCompleted(false);
    setSeconds(time_limit_seconds);
    setQuizAnswers(quizAnswers.map(answer => {
      return {...answer, guessed: false}
    }))
  }

  return (
    <>
      <Row>
        <Col className='text-center'>
          <Row>
            <Col className='text-center mt-3'>
              <h1 className={styles.Heading1}>{title}</h1>
              {is_owner &&
              <MoreDropdown
                item='Quiz'
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />}
            </Col>
          </Row>        
          <p className={styles.Description}>{description}</p>
        </Col>
      </Row>
      <Row className='align-items-center justify-content-center px-3'>
          <Media className='align-items-center text-right'>
            <Media.Body>
              <h2 className={`${styles.NoMargins} ${styles.Heading2}`}>Created by</h2>
              <p className={`${styles.NoMargins} ${styles.BiggerText}`}>{owner}</p>
            </Media.Body>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={64} />
            </Link>
          </Media>
          <Media className='align-items-center'>
            <i className={`${styles.NotCompleted} far fa-times-circle`}></i>
            <Media.Body>
              <h2 className={`${styles.NoMargins} ${styles.Heading2}`}>High Score</h2>
              <p className={`${styles.NoMargins} ${styles.BiggerText}`}>Not completed yet!</p>
            </Media.Body>
          </Media>
      </Row>
      <Row className='mt-3'>
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
            disabled={!quizActive}
          />
          </Form.Group>
        </Col>
        <Col xs={4}>
          { seconds > 0 ? (
            <Timer
              isActive={quizActive}
              seconds={seconds}
              setSeconds={setSeconds}
              stop={giveUp}
              completed={completed}
            />
          ) : (
            "Time's up!"
          )}

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
          {!quizActive && !giveUp && !completed && <Button onClick={() => setQuizActive(true)}>Start!</Button>}
          {quizActive && (seconds > 0) && !completed && <Button onClick={handleGiveUp}>Give Up?</Button>}
          {!quizActive && (seconds < time_limit_seconds) && <Button onClick={handleReset}>Reset</Button>}
        </Col>
      </Row>
    </>
  )
}

export default Quiz