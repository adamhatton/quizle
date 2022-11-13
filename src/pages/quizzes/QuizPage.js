import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';

function QuizPage() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
        try {
            const {data} = await axiosReq.get(`/quizzes/${id}`)
            setQuiz({results: [data]});
        } catch(err){
            console.log(err);
        }
    }
    handleMount();

  }, [id]);

  return (
    <div>
        <h1>Quiz Title</h1>
        <p>Quiz Description</p>
        <Row>
          <Col xs={1}>
            <Avatar />
          </Col>
          <Col xs={2}>
            <h2>Created By</h2>
            <p>Creators' Name</p>
          </Col>
          <Col xs={1}>
            <p>X</p>
          </Col>
          <Col xs={4}>
            <h2>High Score</h2>
            <p>You haven't completed this quiz yet!</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Search Bar</p>
          </Col>
          <Col>
            <p>Timer</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6} lg={4}>
            <h2>Hints</h2>
          </Col>
          <Col xs={6} lg={4}>
            <h2>Answers</h2>
          </Col>
        </Row>    
    </div>
  )
}

export default QuizPage