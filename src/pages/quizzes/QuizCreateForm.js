import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

function QuizCreateForm() {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    category: '',
    time_limit_seconds: '',
    ans_1: '',
    ans_2: '',
    ans_3: '',
    ans_4: '',
    ans_5: '',
    ans_6: '',
    ans_7: '',
    ans_8: '',
    ans_9: '',
    ans_10: '',
    hint_1: '',
    hint_2: '',
    hint_3: '',
    hint_4: '',
    hint_5: '',
    hint_6: '',
    hint_7: '',
    hint_8: '',
    hint_9: '',
    hint_10: '',
  });

  const {
    title,
    description,
    category,
    time_limit_seconds,
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
    hint_10
  } = quizData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  // handleChange function uses computed property so all inputs can call it
  const handleChange = (event) => {
    setQuizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };

  // Submit quiz form data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('time_limit_seconds', time_limit_seconds);
    formData.append('hint_1', hint_1);
    formData.append('hint_2', hint_2);
    formData.append('hint_3', hint_3);
    formData.append('hint_4', hint_4);
    formData.append('hint_5', hint_5);
    formData.append('hint_6', hint_6);
    formData.append('hint_7', hint_7);
    formData.append('hint_8', hint_8);
    formData.append('hint_9', hint_9);
    formData.append('hint_10', hint_10);
    formData.append('ans_1', ans_1);
    formData.append('ans_2', ans_2);
    formData.append('ans_3', ans_3);
    formData.append('ans_4', ans_4);
    formData.append('ans_5', ans_5);
    formData.append('ans_6', ans_6);
    formData.append('ans_7', ans_7);
    formData.append('ans_8', ans_8);
    formData.append('ans_9', ans_9);
    formData.append('ans_10', ans_10);

    try {
        const {data} = await axiosReq.post('/quizzes/', formData);
        history.push(`/quizzes/${data.id}`);
    } catch(err){
        if (err.response?.status !==401){
            setErrors(err.response?.data);
        }
    }
  };

  const instructions = (
    <>
      <h1>Quiz Creation</h1>
      <p>Fill in the fields to create your quiz, please note:</p>
      <ul>
        <li>Your quiz must have 10 hints and 10 answers</li>
        <li>If you don't want to provide hints, just enter 1-10 instead!</li>
        <li>The time limit is a minimum of 30 seconds and a maximum of 600 seconds (10 minutes)</li>
        <li>Scroll down to see some examples of completed quiz forms</li>
      </ul>
    </>
  )

  return (
    <Form onSubmit={handleSubmit}>
        {instructions}
        <Form.Group as={Row} controlId='title'>
          <Form.Label column sm={2}>Title:</Form.Label>
          <Col sm={6}>
            <Form.Control
              type='text'
              placeholder='Title'
              name='title'
              value={title}
              //   className={styles.Input}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {errors.title?.map((message, idx) =>
          <Alert className='col-sm-8' variant="warning" key={idx}>{message}</Alert>
        )}

        <Form.Group as={Row} controlId='description'>
          <Form.Label column sm={2}>
            Description:
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Description'
              name='description'
              value={description}
              //   className={styles.Input}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {errors.description?.map((message, idx) =>
          <Alert className='col-sm-8' variant="warning" key={idx}>{message}</Alert>
        )}

        <Form.Group as={Row} controlId='category'>
          <Form.Label column sm={2}>
            Category:
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              as='select'
              rows={3}
              name='category'
              value={category}
              //   className={styles.Input}
              onChange={handleChange}
            >
              <option value=''>Pick a Category</option>
              <option value='sport'>Sport</option>
              <option value='music'>Music</option>
              <option value='entertainment'>Entertainment</option>
              <option value='general'>General Knowledge</option>    
            </Form.Control>
          </Col>
        </Form.Group>
        {errors.category?.map((message, idx) =>
          <Alert className='col-sm-8' variant="warning" key={idx}>{message}</Alert>
        )}

        <Form.Group as={Row} controlId='time_limit_seconds'>
          <Form.Label column sm={2}>
            Time Limit (seconds):
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              type='number'
              min='30'
              max='600'
              placeholder='Time Limit (seconds)'
              name='time_limit_seconds'
              value={time_limit_seconds}
              //   className={styles.Input}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {errors.time_limit_seconds?.map((message, idx) =>
          <Alert className='col-sm-8' variant="warning" key={idx}>{message}</Alert>
        )}

        <Row>
            <Col sm={4}>
                <h2>Hints</h2>
            </Col>
            <Col sm={4}>
                <h2>Answers</h2>
            </Col>
        </Row>

        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_1'>
            <Form.Label srOnly>Hint 1</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 1'
              name='hint_1'
              value={hint_1}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.hint_1?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
          </Form.Group>

          <Form.Group as={Col} sm={4} controlId='ans_1'>
            <Form.Label srOnly>Answer 1</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 1'
              name='ans_1'
              value={ans_1}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.ans_1?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )} 
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_2'>
            <Form.Label srOnly>Hint 2</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 2'
              name='hint_2'
              value={hint_2}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.hint_2?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
          </Form.Group>

          <Form.Group as={Col} sm={4} controlId='ans_2'>
            <Form.Label srOnly>Answer 2</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 2'
              name='ans_2'
              value={ans_2}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.ans_2?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )} 
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_3'>
            <Form.Label srOnly>Hint 3</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 3'
              name='hint_3'
              value={hint_3}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.hint_3?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
          </Form.Group>

          <Form.Group as={Col} sm={4} controlId='ans_3'>
            <Form.Label srOnly>Answer 3</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 3'
              name='ans_3'
              value={ans_3}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.ans_3?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )} 
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_4'>
            <Form.Label srOnly>Hint 4</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 4'
              name='hint_4'
              value={hint_4}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.hint_4?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
          </Form.Group>

          <Form.Group as={Col} sm={4} controlId='ans_4'>
            <Form.Label srOnly>Answer 4</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 4'
              name='ans_4'
              value={ans_4}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.ans_4?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_5'>
            <Form.Label srOnly>Hint 5</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 5'
              name='hint_5'
              value={hint_5}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.hint_5?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
          </Form.Group>

          <Form.Group as={Col} sm={4} controlId='ans_5'>
            <Form.Label srOnly>Answer 5</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 5'
              name='ans_5'
              value={ans_5}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.ans_5?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )} 
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_6'>
            <Form.Label srOnly>Hint 6</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 6'
              name='hint_6'
              value={hint_6}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.hint_6?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}        
          </Form.Group>

          <Form.Group as={Col} sm={4} controlId='ans_6'>
            <Form.Label srOnly>Answer 6</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 6'
              name='ans_6'
              value={ans_6}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.ans_6?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )} 
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_7'>
            <Form.Label srOnly>Hint 7</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 7'
              name='hint_7'
              value={hint_7}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.hint_7?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
          </Form.Group>

          <Form.Group as={Col} sm={4} controlId='ans_7'>
            <Form.Label srOnly>Answer 7</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 7'
              name='ans_7'
              value={ans_7}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.ans_7?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )} 
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_8'>
            <Form.Label srOnly>Hint 8</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 8'
              name='hint_8'
              value={hint_8}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.hint_8?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}          
          </Form.Group>

          <Form.Group as={Col} sm={4} controlId='ans_8'>
            <Form.Label srOnly>Answer 8</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 8'
              name='ans_8'
              value={ans_8}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.ans_8?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )} 
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_9'>
            <Form.Label srOnly>Hint 9</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 9'
              name='hint_9'
              value={hint_9}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.hint_9?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}          
          </Form.Group>

          <Form.Group as={Col} sm={4} controlId='ans_9'>
            <Form.Label srOnly>Answer 9</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 9'
              name='ans_9'
              value={ans_9}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.ans_9?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}           
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_10'>
            <Form.Label srOnly>Hint 10</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 10'
              name='hint_10'
              value={hint_10}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.hint_10?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}          
          </Form.Group>

          <Form.Group as={Col} sm={4} controlId='ans_10'>
            <Form.Label srOnly>Answer 10</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 10'
              name='ans_10'
              value={ans_10}
              //   className={styles.Input}
              onChange={handleChange}
            />
            {errors.ans_10?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )} 
          </Form.Group>
        </Form.Row>
        
        <Button variant='primary' type='submit'>
          Submit
        </Button>

        {errors.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" key={idx} className="mt-3">
          {message}
        </Alert>
      ))}
    </Form>
  )
}

export default QuizCreateForm