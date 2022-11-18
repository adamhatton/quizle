import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { axiosReq } from '../../api/axiosDefaults';

import QuizTile from './QuizTile';
import Container from 'react-bootstrap/Container';
import Asset from '../../components/Asset';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData, setImageAlt, setImageSource } from '../../utils/Utils';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const QuizzesPage = ({ filter='', page='All' }) => {
  const [quizzes, setQuizzes] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const { pathname } = useLocation();
  
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await axiosReq.get(`/quizzes/?${filter}search=${query}`);
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
  }, [filter, pathname, query]);



  const mobileButtonGroup = (
    <>
      <ButtonToolbar aria-label='Toolbar with quiz category selectors' className='d-md-none justify-content-center'>
        <ButtonGroup size='lg' className='mr-2' aria-label='First group'>
          <Link to={'/'}>
            <Button variant='info'>All</Button>
          </Link>
          <Link to={'/quizzes/sport'}>
            <Button variant='info'>Sport</Button>
          </Link>
          <Link to={'/quizzes/entertainment'}>
            <Button variant='info'>Entertainment</Button>
          </Link>
        </ButtonGroup>
        <ButtonGroup size='sm' className='mr-2' aria-label='Second group'>
          <Link to={'/quizzes/music'}>
            <Button variant='info'>Music</Button>
          </Link>
          <Link to={'/quizzes/general'}>
            <Button variant='info'>General</Button>
          </Link>
          <Link to={'/quizzes/popular'}>
            <Button variant='info'>Popular</Button>
          </Link>
        </ButtonGroup>
      </ButtonToolbar>
    </>
  )

  const desktopButtonGroup = (
    <>
      <ButtonGroup aria-label='Quiz category selector' className='d-md-block d-none'>
        <Link to={'/'}>
          <Button variant='info'>All</Button>
        </Link>
        <Link to={'/quizzes/sport'}>
          <Button variant='info'>Sport</Button>
        </Link>
        <Link to={'/quizzes/music'}>
          <Button variant='info'>Music</Button>
        </Link>
        <Link to={'/quizzes/entertainment'}>
          <Button variant='info'>Entertainment</Button>
        </Link>
        <Link to={'/quizzes/general'}>
          <Button variant='info'>General Knowledge</Button>
        </Link>
        <Link to={'/quizzes/popular'}>
          <Button variant='info'>Most Popular</Button>
        </Link>
      </ButtonGroup>
    </>
  )

  return (
    <>
      <Row>
        <Col xs={12} lg={5}>
            <h1>{page} Quizles</h1>
            {page === 'All' ? (
              <p>All the Quizles you can handle!</p>
            ) : (
              <p>All the {page} Quizles you can handle!</p>
            )}
        </Col>
        <Col xs={12} lg={7}>
          <Form
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type='text'
                className='mr-sm-2'
                placeholder='Search quizzes'
            />
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {mobileButtonGroup}
          {desktopButtonGroup}
        </Col>
      </Row>
      <Row className='mt-5'>
        { hasLoaded ? (
          <>
            {quizzes.results.length ? (
              <InfiniteScroll 
                children={quizzes.results.map(quiz => {
                  const imageSource = setImageSource(quiz.category);
                  const imageAlt = setImageAlt(quiz.category);
                  return (
                    <Col key={quiz.id} xs={12} md={6}>
                      <QuizTile {...quiz} src={imageSource} message={imageAlt} />
                    </Col>
                  )
                })}
                dataLength={quizzes.results.length}
                loader={<Asset spinner />}
                hasMore={!!quizzes.next}
                next={() => fetchMoreData(quizzes, setQuizzes)}
                className='d-flex flex-wrap'
              />
                
              ) : (
              <Container>
                <Asset question message='No results found' />
              </Container>
              )
            }
          </>
          ) : (
            <Container>
              <Asset spinner></Asset>
            </Container>
          )}
      </Row>
    </>
  )
}

export default QuizzesPage