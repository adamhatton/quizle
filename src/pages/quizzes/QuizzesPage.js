import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { axiosReq } from '../../api/axiosDefaults';

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
      <Row>
        <p>Map Quiz Tile</p>
      </Row>
    </>
  )
}

export default QuizzesPage