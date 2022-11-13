import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';

function QuizCreateForm() {

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
    <Form>
        {instructions}
        <Form.Group as={Row} controlId='title'>
          <Form.Label column sm={2}>Title:</Form.Label>
          <Col sm={6}>
            <Form.Control
              type='text'
              placeholder='Title'
              name='title'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
        )} */}

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
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
        )} */}

        <Form.Group as={Row} controlId='category'>
          <Form.Label column sm={2}>
            Category:
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              as='select'
              rows={3}
              name='category'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            >
              <option value='sport'>Sport</option>
              <option value='music'>Music</option>
              <option value='entertainment'>Entertainment</option>
              <option value='general'>General Knowledge</option>    
            </Form.Control>
          </Col>
        </Form.Group>
        {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
        )} */}

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
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
        )} */}

        <Form.Row>
          <Form.Group as={Col} controlId='hint_1'>
            <Form.Label srOnly>Hint 1</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 1'
              name='hint_1'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */} 
        </Form.Row>
    </Form>
  )
}

export default QuizCreateForm