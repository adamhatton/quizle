import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { axiosReq } from '../../api/axiosDefaults';
import Entertainment from "../../assets/entertainment.png";
import General from "../../assets/general.png";
import Music from "../../assets/music.png";
import Sport from "../../assets/sport.png";
import QuizTile from './QuizTile';

const QuizzesPage = ({ filter='' }) => {
  const [quizzes, setQuizzes] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await axiosReq.get(`/quizzes/?${filter}`);
        setQuizzes(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchQuizzes();
    }, 1000);
  
    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname]);


  return (
    <>
      <Row>
        <Col xs={12} lg={5}>
            <h1>Category Title</h1>
            <p>All the Quizles you can handle!</p>
        </Col>
        <Col xs={12} lg={7}>
          <Form
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
                // value={query}
                // onChange={(event) => setQuery(event.target.value)}
                type="text"
                className="mr-sm-2"
                placeholder="Search quizzes"
            />
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonGroup aria-label="Basic example">
            <Button variant="info">All</Button>
            <Button variant="info">Sport</Button>
            <Button variant="info">Music</Button>
            <Button variant="info">Entertainment</Button>
            <Button variant="info">General Knowledge</Button>
            <Button variant="info">Most Popular</Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col xs={12} md={6}>
            <QuizTile src={Sport} message='A simple icon of a football pitch' />
        </Col>
        <Col xs={12} md={6}>
            <QuizTile src={Music} message='A simple icon of a pair of headphones' />
        </Col>
        <Col xs={12} md={6}>
            <QuizTile src={Entertainment} message="A simple icon of a director's clapperboard" />
        </Col>
        <Col xs={12} md={6}>
            <QuizTile src={General} message='A simple icon of a question mark' />
        </Col>
      </Row>
    </>
  )
}

export default QuizzesPage