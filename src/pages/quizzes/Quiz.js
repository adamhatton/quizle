import React, { useEffect, useState } from 'react'
import Media from 'react-bootstrap/Media';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Avatar from '../../components/Avatar';
import { Link, useHistory } from 'react-router-dom';
import styles from '../../styles/Quiz.module.css'
import btnStyles from '../../styles/Button.module.css'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Timer from '../../components/Timer';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Container } from 'react-bootstrap';

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
    score_time,
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
      console.log('handleCompleted called')
      const guessedAnswers = quizAnswers.reduce((acc, cur) => {
        return cur.guessed === true ? acc + 1 : acc
      }, 0);
      console.log('guessedAnswers is', guessedAnswers)
      const allGuessed = guessedAnswers === 10 ? true : false;
      if (allGuessed && !giveUp) {
        setCompleted(true);
        setQuizActive(false);
        const score = time_limit_seconds - seconds;
        handleCreateScore(score);
      }
    }

    const handleCreateScore = async (score) => {
      if (!score_id) {
        try {
            const {data} = await axiosReq.post('/scores/', {
              quiz: id,
              completed_time: score,
            });
            setQuizInfo((prevQuiz) => ({
              ...prevQuiz,
              score_time: data.completed_time
            }))
        } catch(err){
          console.log(err)
        }
      } else if (score < score_time) {
          try {
            const {data} = await axiosReq.put(`/scores/${score_id}`, {
              quiz: id,
              completed_time: score,
            });
            setQuizInfo((prevQuiz) => ({
              ...prevQuiz,
              score_time: data.completed_time
            }))
          } catch(err){
          console.log(err)
          }
      }
    }
    handleCompleted();
}, [quizAnswers, id, giveUp, score_id, score_time, seconds, time_limit_seconds, setQuizInfo])

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
    if(quizActive){
      const formattedGuess = event.target.value.trim().toLowerCase();
      setQuizAnswers(quizAnswers.map(answer => {
        const formattedAnswer = answer.value.trim().toLowerCase();
        if (formattedGuess === formattedAnswer && !answer.guessed) {
          event.target.value = '';
          return {...answer, guessed: true}
        } else {
          return {...answer}
        } 
      }))
    }
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

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { quiz: id });
      setQuizInfo((prevQuiz) => ({
        ...prevQuiz,
        likes_count: prevQuiz.likes_count + 1,
        like_id: data.id 
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setQuizInfo((prevQuiz) => ({
        ...prevQuiz,
        likes_count: prevQuiz.likes_count - 1,
        like_id: null 
      }));
    } catch (err) {
      console.log(err);
    }
  };

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
          <Media className={`align-items-center text-right ${styles.QuizMedia}`}>
            <Media.Body>
              <h2 className={`${styles.NoMargins} ${styles.Heading2}`}>Created by</h2>
              <p className={`${styles.NoMargins} ${styles.BiggerText}`}>{owner}</p>
            </Media.Body>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={64} />
            </Link>
          </Media>
          <Media className={`align-items-center ${styles.QuizMedia}`}>
            {score_id ? (
              <i className={`${styles.Completed} far fa-check-circle`}></i>    
            ) : (
              <i className={`${styles.NotCompleted} far fa-times-circle`}></i>
            )}
            <Media.Body>
              <h2 className={`${styles.NoMargins} ${styles.Heading2}`}>High Score</h2>
              <p className={`${styles.NoMargins} ${styles.BiggerText}`}>
                {score_id ? (
                  <>
                    {Math.floor(score_time / 60)}:
                    {(score_time % 60) < 10 ? `0${score_time % 60}` : (score_time % 60)}
                  </>
                ) : (
                  'Quizle not completed!'
                )}

              </p>
            </Media.Body>
          </Media>
      </Row>
      <Row className='my-4 align-items-center justify-content-center'>
        <Col xs='auto' className='pr-2'>
          <Form.Group controlId='guess_input' className='mb-0'>
          <Form.Label srOnly>Guess:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Guess'
            name='title'
            onKeyUp={handleGuess}
            disabled={!quizActive}
            className={styles.Guess}
          />
          </Form.Group>
        </Col>
        <Col xs='auto' className='pl-2'>
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
        <Col xs={12} className='text-center mt-3'>
          {!quizActive && !giveUp && !completed && 
            <Button
              onClick={() => setQuizActive(true)}
              className={btnStyles.Btn}
            >
                Start!
            </Button>
          }
          {quizActive && (seconds > 0) && !completed &&
            <Button
              onClick={handleGiveUp}
              className={btnStyles.Btn}
            >
              Give Up?
            </Button>}
          {!quizActive && (seconds < time_limit_seconds) &&
            <Button
              onClick={handleReset}
              className={btnStyles.Btn}
            >
              Reset
            </Button>
          }
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Table striped bordered hover className={styles.Table}>
              <thead>
                <tr>
                  <th className={styles.TableHead}>Hints</th>
                  <th className={styles.TableHead}>Answers</th>
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
        <Col className={'text-center mt-2'}>
          <Container className='d-flex flex-column'>
            {is_owner ? (
              <OverlayTrigger
                placement='top'
                overlay={<Tooltip>You can't like your own quiz!</Tooltip>}
              >
                <i className={`far fa-thumbs-up ${styles.Like} ${styles.LikeOutline}`} />
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <i className={`far fa-thumbs-up ${styles.Like} ${styles.LikeFill}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <i className={`far fa-thumbs-up ${styles.Like} ${styles.LikeOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement='top'
                overlay={<Tooltip>Log in to like posts!</Tooltip>}
              >
                <i className={`far fa-thumbs-up ${styles.Like} ${styles.LikeOutline}`} />
              </OverlayTrigger>
            )}
            {likes_count}
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default Quiz