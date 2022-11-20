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

/* Display quiz and enable a user to complete it */
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
    mobile,
  } = props;

  const [quizActive, setQuizActive] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [seconds, setSeconds] = useState(time_limit_seconds);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const history = useHistory();

  // Check if user has completed quiz and, if yes, create a score
  useEffect(() => {
      // Checks how many answers user has guessed
      const handleCompleted = () => {
      const guessedAnswers = quizAnswers.reduce((acc, cur) => {
        return cur.guessed === true ? acc + 1 : acc
      }, 0);
      const allGuessed = guessedAnswers === 10 ? true : false;
      if (allGuessed && !giveUp) {
        setCompleted(true);
        setQuizActive(false);
        const score = time_limit_seconds - seconds;
        handleCreateScore(score);
      }
    }

    // If user has guessed all answers, create a score for them
    const handleCreateScore = async (score) => {
      // If user has not previously completed quiz, create a new score
      if (!score_id) {
        try {
            const {data} = await axiosReq.post('/scores/', {
              quiz: id,
              completed_time: score,
            });
            setQuizInfo((prevQuiz) => ({
              ...prevQuiz,
              score_time: data.completed_time,
              score_id: data.id
            }))
        } catch(err){
          console.log(err)
        }
      } 
      // If user has previously completed quiz, update their score
      else if (score < score_time) {
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

  // If user own's quiz send them to the edit page
  const handleEdit = () => {
    history.push(`/quizzes/${id}/edit`);
  };

  // If user own's quiz then allow them to delete it
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/quizzes/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  // Check user's guess on every keystroke. Handled on client side
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

  // If user has pressed the Give Up button, reveal the answers
  const handleGiveUp = () => {
    setGiveUp(true);
    setQuizActive(false);
    setQuizAnswers(quizAnswers.map(answer => {
      return {...answer, guessed: true}
    }))
  }

  // Reset the state variables
  const handleReset = () => {
    setQuizActive(false);
    setGiveUp(false);
    setCompleted(false);
    setSeconds(time_limit_seconds);
    setQuizAnswers(quizAnswers.map(answer => {
      return {...answer, guessed: false}
    }))
  }

  // Enable a user to like the quiz
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

  // Enable a user to unlike the quiz
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
      {/* Quiz title and description */}
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
          <p className={`${styles.Description} mb-1`}>{description}</p>
        </Col>
      </Row>
      {/* Creator's profile Avatar and current user's high score information */}
      <Row className='align-items-center justify-content-center px-3 d-none d-md-flex'>
          <Media className={`align-items-center text-right ${styles.QuizMedia}`}>
            <Media.Body>
              <h2 className={`${styles.NoMargins} ${styles.Heading2}`}>Created by</h2>
              <p className={`${styles.NoMargins} ${styles.BiggerText}`}>{owner}</p>
            </Media.Body>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={64} />
            </Link>
          </Media>
          {currentUser ? (
            <Media className={`align-items-center ${styles.QuizMedia}`}>
              {score_id ? (
                <i className={`${styles.ScoreIcon} ${styles.Completed} far fa-check-circle`}></i>    
              ) : (
                <i className={`${styles.ScoreIcon} ${styles.NotCompleted} far fa-times-circle`}></i>
              )}
              <Media.Body>
                <h2 className={`${styles.NoMargins} ${styles.Heading2}`}>Your High Score</h2>
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
          ) : (
            <Media className={`align-items-center ${styles.QuizMedia}`}>
                <i className={`${styles.ScoreIcon} ${styles.LoggedOut} far fa-times-circle`}></i>
              <Media.Body>
                <h2 className={`${styles.NoMargins} ${styles.Heading2}`}>High Score</h2>
                <p className={`${styles.NoMargins} ${styles.BiggerText}`}>
                  Login for high scores!
                </p>
              </Media.Body>
            </Media>
          )}
      </Row>
      {/* Guess input and timer */}
      <Row className='my-3 align-items-center justify-content-center'>
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
            <p className={styles.TimeText}>Time's up!</p>
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
      {/* Hints and Answers table */}
      <Row>
        <Col xs={12}>
          <Table bordered className={styles.Table}>
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
                    {answer.guessed ? (
                      <td className={`${styles.TableCell} text-break`}>{answer.value}</td>
                    ) : (
                      <td className={'text-break'}>-</td>
                    )}
                  </tr>
                )}
              </tbody>
          </Table>
        </Col>
        {/* Like button */}
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
        {mobile &&
          <Row className='flex-column text-center px-3 d-md-none'>
              <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={64} />
              </Link>
              <Col>
                <h2 className={`${styles.NoMargins} ${styles.Heading2}`}>Created by</h2>
                <p className={`${styles.NoMargins} ${styles.BiggerText}`}>{owner}</p>
              </Col>
          {currentUser ? (
            <>
              {score_id ? (
                <i className={`${styles.ScoreIcon} ${styles.Completed} far fa-check-circle`}></i>    
              ) : (
                <i className={`${styles.ScoreIcon} ${styles.NotCompleted} far fa-times-circle`}></i>
              )}
              <Col>
                <h2 className={`${styles.NoMargins} ${styles.Heading2}`}>Your High Score</h2>
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
              </Col>
            </>
          ) : (
            <>
                <i className={`${styles.ScoreIcon} ${styles.LoggedOut} far fa-times-circle`}></i>
              <Col>
                <h2 className={`${styles.NoMargins} ${styles.Heading2}`}>Your High Score</h2>
                <p className={`${styles.NoMargins} ${styles.BiggerText}`}>
                  Login for high scores!
                </p>
              </Col>
            </>
          )}
        </Row>
      }
    </>
  )
}

export default Quiz