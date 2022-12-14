import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from '../../hooks/useRedirect';
import styles from '../../styles/QuizCreateEditForm.module.css';
import btnStyles from '../../styles/Button.module.css';

/* Form for creating a new quiz */
function QuizCreateForm() {
  useRedirect('loggedOut');

  // Set state for quiz data
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

  // destructure quiz data into variables
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

  // set up an array for use with outputting the hints input fields
  const hintsArray = [
    {name: 'hint_1', value: hint_1, placeholder: 'Hint 1'},
    {name: 'hint_2', value: hint_2, placeholder: 'Hint 2'},
    {name: 'hint_3', value: hint_3, placeholder: 'Hint 3'},
    {name: 'hint_4', value: hint_4, placeholder: 'Hint 4'},
    {name: 'hint_5', value: hint_5, placeholder: 'Hint 5'},
    {name: 'hint_6', value: hint_6, placeholder: 'Hint 6'},
    {name: 'hint_7', value: hint_7, placeholder: 'Hint 7'},
    {name: 'hint_8', value: hint_8, placeholder: 'Hint 8'},
    {name: 'hint_9', value: hint_9, placeholder: 'Hint 9'},
    {name: 'hint_10', value: hint_10, placeholder: 'Hint 10'},
  ];

  // set up an array for use with outputting the answers input fields
  const answersArray = [
    {name: 'ans_1', value: ans_1, placeholder: 'Answer 1'},
    {name: 'ans_2', value: ans_2, placeholder: 'Answer 2'},
    {name: 'ans_3', value: ans_3, placeholder: 'Answer 3'},
    {name: 'ans_4', value: ans_4, placeholder: 'Answer 4'},
    {name: 'ans_5', value: ans_5, placeholder: 'Answer 5'},
    {name: 'ans_6', value: ans_6, placeholder: 'Answer 6'},
    {name: 'ans_7', value: ans_7, placeholder: 'Answer 7'},
    {name: 'ans_8', value: ans_8, placeholder: 'Answer 8'},
    {name: 'ans_9', value: ans_9, placeholder: 'Answer 9'},
    {name: 'ans_10', value: ans_10, placeholder: 'Answer 10'},
  ];

  const [errors, setErrors] = useState({});

  const history = useHistory();

  // handleChange function uses computed property so all inputs can call it
  const handleChange = (event) => {
    setQuizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };

  // Submit quiz form data to database
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

  // JSX for instructions
  const instructions = (
    <>
      <h1>Quiz Creation</h1>
      <p>Fill in the fields to create your quiz, please note:</p>
      <ul className={styles.FormList}>
        <li>Your quiz must have 10 hints and 10 answers</li>
        <li>If you don't want to provide hints, just enter 1-10 instead!</li>
        <li>The time limit is a minimum of 30 seconds and a maximum of 600 seconds (10 minutes)</li>
      </ul>
    </>
  );

  return (
    <Form onSubmit={handleSubmit} className={styles.QuizForm}>
        {instructions}
        <Form.Group as={Row} controlId='title' className={styles.FormGroup}>
          <Form.Label column md={2} className={styles.FormLabel}>
            Title:
          </Form.Label>
          <Col md={6}>
            <Form.Control
              type='text'
              placeholder='Title'
              name='title'
              value={title}
              onChange={handleChange}
            />
            {errors.title?.map((message, idx) =>
              <Alert className='col' variant="warning" key={idx}>{message}</Alert>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='description' className={styles.FormGroup}>
          <Form.Label column md={2} className={styles.FormLabel}>
            Description:
          </Form.Label>
          <Col md={6}>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Description'
              name='description'
              value={description}
              onChange={handleChange}
            />
            {errors.description?.map((message, idx) =>
              <Alert className='col' variant="warning" key={idx}>{message}</Alert>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='category' className={styles.FormGroup}>
          <Form.Label column md={2} className={styles.FormLabel}>
            Category:
          </Form.Label>
          <Col md={6}>
            <Form.Control
              as='select'
              rows={3}
              name='category'
              value={category}
              onChange={handleChange}
            >
              <option value=''>Pick a Category</option>
              <option value='sport'>Sport</option>
              <option value='music'>Music</option>
              <option value='entertainment'>Entertainment</option>
              <option value='general'>General Knowledge</option>    
            </Form.Control>
            {errors.category?.map((message, idx) =>
              <Alert className='col' variant="warning" key={idx}>{message}</Alert>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='time_limit_seconds' className={styles.FormGroup}>
          <Form.Label column md={2} className={styles.FormLabel}>
            Time Limit (seconds):
          </Form.Label>
          <Col md={6}>
            <Form.Control
              type='number'
              min='30'
              max='600'
              placeholder='Time Limit (seconds)'
              name='time_limit_seconds'
              value={time_limit_seconds}
              onChange={handleChange}
            />
            {errors.time_limit_seconds?.map((message, idx) =>
              <Alert className='col' variant="warning" key={idx}>{message}</Alert>
            )}
          </Col>
        </Form.Group>

        <Row className='justify-content-center'>
            <Col xs={6} lg={4}>
                <h2>Hints</h2>
            </Col>
            <Col xs={6} lg={4}>
                <h2>Answers</h2>
            </Col>
        </Row>
        
        {/* Hints Inputs Column */}
        <Row className='justify-content-center'>
          <Col as={Col} xs={6} lg={4}>
            { hintsArray.map((hint, idx) =>
              <Form.Group key={idx} controlId={hint.name}>
                <Form.Label srOnly>{hint.placeholder}</Form.Label>
                <Form.Control
                  type='text'
                  placeholder={hint.placeholder}
                  name={hint.name}
                  value={hint.value}
                  onChange={handleChange}
                />
                {errors[hint.name]?.map((message, idx) =>
                  <Alert variant="warning" key={idx}>{message}</Alert>
                )}
              </Form.Group>
            )}
          </Col>

          {/* Answers Inputs Column */}
          <Col as={Col} xs={6} lg={4}>
            { answersArray.map((answer, idx) =>
              <Form.Group key={idx} controlId={answer.name}>
                <Form.Label srOnly>{answer.placeholder}</Form.Label>
                <Form.Control
                  type='text'
                  placeholder={answer.placeholder}
                  name={answer.name}
                  value={answer.value}
                  onChange={handleChange}
                />
                {errors[answer.name]?.map((message, idx) =>
                  <Alert variant="warning" key={idx}>{message}</Alert>
                )}
              </Form.Group>
            )}
          </Col>
        </Row>

        <Button
        onClick={() => history.goBack()}
        className={`${btnStyles.Btn} mr-3`}
        >
          Cancel
        </Button>
        
        <Button className={btnStyles.Btn} type='submit'>
          Submit
        </Button>

        {errors.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" key={idx} className="mt-3">
          {message}
        </Alert>
      ))}
    </Form>
  );
}

export default QuizCreateForm;