import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Avatar from '../../components/Avatar';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from 'react-bootstrap/Container';
import Asset from '../../components/Asset';
import QuizTile from '../quizzes/QuizTile';
import { fetchMoreData, setImageAlt, setImageSource } from '../../utils/Utils';

const ProfilePage = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState({});
  const [createdQuizzes, setCreatedQuizzes] = useState({results: []});
  const [completedQuizzes, setCompletedQuizzes] = useState({results: []});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [
              {data: pageProfile},
              {data: createdQuizzes},
              {data: completedQuizzes}
            ] = await Promise.all([
                axiosReq.get(`/profiles/${id}/`),
                axiosReq.get(`/quizzes/?owner=${id}`),
                axiosReq.get(`/quizzes/?scores__owner=${id}`),
            ])
            setProfile(pageProfile);
            setCreatedQuizzes(createdQuizzes);
            setCompletedQuizzes(completedQuizzes);
            setHasLoaded(true);
        } catch(err) {
            console.log(err)
        }
    }

    fetchData()
  }, [id]);

  const completedQuizTiles = (
    <>
    { hasLoaded ? (
      <>
        {createdQuizzes.results.length ? (
          <InfiniteScroll 
            children={createdQuizzes.results.map(quiz => {
              // const imageSource = setImageSource(quiz.category);
              // const imageAlt = setImageAlt(quiz.category);
              return (
                <Col key={quiz.id} xs={12} md={6}>
                  <QuizTile {...quiz} src={'imageSource'} message={'imageAlt'} />
                </Col>
              )
            })}
            dataLength={createdQuizzes.results.length}
            loader={<Asset spinner />}
            hasMore={!!createdQuizzes.next}
            next={() => fetchMoreData(createdQuizzes, setCreatedQuizzes)}
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
    </>
  )

  return (
    <>
      <Row>
        <Col>
          <Media className='mt-5'>
            <Avatar src={profile.image} height={240} />
            <Media.Body>
                <Row>
                  <Col className='d-flex'>
                    <h2>{profile.owner}</h2>
                    <p>3 dots</p>
                  </Col>
                </Row>
                <p>Name: {profile.name ? profile.name : 'No name provided'}</p>
                <p>Bio:</p>
                <p>{profile.bio ? profile.bio : 'No bio provided'}</p>
            </Media.Body>
          </Media>
        </Col>
      </Row>
      <Row>
        <Col>
          <i className='far fa-check-circle'></i>
          <p>Completed quizzes: {profile.completed_quizzes_count ? profile.completed_quizzes_count : 0}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonGroup aria-label='Quizzes created and quizzes completed selector'>
              <Button variant='info'>Created Quizzes</Button>
              <Button variant='info'>Completed Quizzes</Button>
          </ButtonGroup>
          {completedQuizTiles}
        </Col>
      </Row>
    </>
  )
}

export default ProfilePage