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
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */}

          <Form.Group as={Col} sm={4} controlId='ans_1'>
            <Form.Label srOnly>Answer 1</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 1'
              name='ans_1'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */} 
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_2'>
            <Form.Label srOnly>Hint 2</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 2'
              name='hint_2'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */}

          <Form.Group as={Col} sm={4} controlId='ans_2'>
            <Form.Label srOnly>Answer 2</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 2'
              name='ans_2'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */} 
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_3'>
            <Form.Label srOnly>Hint 3</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 3'
              name='hint_3'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */}

          <Form.Group as={Col} sm={4} controlId='ans_3'>
            <Form.Label srOnly>Answer 3</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 3'
              name='ans_3'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */} 
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_4'>
            <Form.Label srOnly>Hint 4</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 4'
              name='hint_4'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */}

          <Form.Group as={Col} sm={4} controlId='ans_4'>
            <Form.Label srOnly>Answer 4</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 4'
              name='ans_4'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */} 
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_5'>
            <Form.Label srOnly>Hint 5</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 5'
              name='hint_5'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */}

          <Form.Group as={Col} sm={4} controlId='ans_5'>
            <Form.Label srOnly>Answer 5</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 5'
              name='ans_5'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */} 
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_6'>
            <Form.Label srOnly>Hint 6</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 6'
              name='hint_6'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */}

          <Form.Group as={Col} sm={4} controlId='ans_6'>
            <Form.Label srOnly>Answer 6</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 6'
              name='ans_6'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */} 
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_7'>
            <Form.Label srOnly>Hint 7</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 7'
              name='hint_7'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */}

          <Form.Group as={Col} sm={4} controlId='ans_7'>
            <Form.Label srOnly>Answer 7</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 7'
              name='ans_7'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */} 
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_8'>
            <Form.Label srOnly>Hint 8</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 8'
              name='hint_8'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */}

          <Form.Group as={Col} sm={4} controlId='ans_8'>
            <Form.Label srOnly>Answer 8</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 8'
              name='ans_8'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */} 
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_9'>
            <Form.Label srOnly>Hint 9</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 9'
              name='hint_9'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */}

          <Form.Group as={Col} sm={4} controlId='ans_9'>
            <Form.Label srOnly>Answer 9</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 9'
              name='ans_9'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */} 
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4} controlId='hint_10'>
            <Form.Label srOnly>Hint 10</Form.Label>
            <Form.Control
              type='text'
              placeholder='Hint 10'
              name='hint_10'
              //   value={username}
              //   className={styles.Input}
              //   onChange={handleChange}
            />
          </Form.Group>
          {/* {errors.username?.map((message, idx) =>
          <Alert variant="warning" key={idx}>{message}</Alert>
          )} */}

          <Form.Group as={Col} sm={4} controlId='ans_10'>
            <Form.Label srOnly>Answer 10</Form.Label>
            <Form.Control
              type='text'
              placeholder='Answer 10'
              name='ans_10'
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