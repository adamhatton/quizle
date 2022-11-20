import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
import { ProfileEditDropdown } from '../../components/MoreDropdown';
import btnStyles from '../../styles/Button.module.css'
import styles from '../../styles/ProfilePage.module.css'

/* ProfilePage component shows user's profile info and fetches any quizzes 
they have created or completed for display */
const ProfilePage = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState({});
  const [createdQuizzes, setCreatedQuizzes] = useState({results: []});
  const [completedQuizzes, setCompletedQuizzes] = useState({results: []});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [quizView, setQuizView] = useState('created');

  // On mount fetch profile info, created quiz info, and completed quiz info
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

  // JSX for displaying QuizTiles for quizzes created by the user
  const createdQuizTiles = (
    <>
    { hasLoaded ? (
      <>
        {createdQuizzes.results.length ? (
          <InfiniteScroll 
            children={createdQuizzes.results.map(quiz => {
              const imageSource = setImageSource(quiz.category);
              const imageAlt = setImageAlt(quiz.category);
              return (
                <Col key={quiz.id} xs={12} md={6}>
                  <QuizTile {...quiz} src={imageSource} message={imageAlt} />
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
          <Container className='text-center'>
            <Asset question message='No quizzes created!' />
          </Container>
          )
        }
      </>
      ) : (
        <Container className='text-center'>
          <Asset spinner></Asset>
        </Container>
      )}
    </>
  )

  // JSX for displaying QuizTiles for quizzes completed by the user
  const completedQuizTiles = (
    <>
    { hasLoaded ? (
      <>
        {completedQuizzes.results.length ? (
          <InfiniteScroll 
            children={completedQuizzes.results.map(quiz => {
              const imageSource = setImageSource(quiz.category);
              const imageAlt = setImageAlt(quiz.category);
              return (
                <Col key={quiz.id} xs={12} md={6}>
                  <QuizTile {...quiz} src={imageSource} message={imageAlt} />
                </Col>
              )
            })}
            dataLength={completedQuizzes.results.length}
            loader={<Asset spinner />}
            hasMore={!!completedQuizzes.next}
            next={() => fetchMoreData(completedQuizzes, setCompletedQuizzes)}
            className='d-flex flex-wrap'
          />
            
          ) : (
          <Container className='text-center'>
            <Asset question message='No quizzes completed!' />
          </Container>
          )
        }
      </>
      ) : (
        <Container className='text-center'>
          <Asset spinner></Asset>
        </Container>
      )}
    </>
  )

  return (
    <>
      <Row className='justify-content-center align-items-center my-5'>
        <Col xs='auto'>
            <Avatar src={profile.image} height={240} />
        </Col>
        <Col xs='auto'>
          <h2 className='text-break pr-4'>{profile.owner}</h2>
          {profile.is_owner &&
            <ProfileEditDropdown
              id={id}
            />}
          <p className='text-break'>Name: {profile.name}</p>
          <p>Created quizzes: {profile.created_quizzes_count ? profile.created_quizzes_count : 0}</p>
          <p>Completed quizzes: {profile.completed_quizzes_count ? profile.completed_quizzes_count : 0}</p>
          <p>Bio:</p>
          <p className={`${styles.Bio} text-break`}>{profile.bio}</p>
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <ButtonGroup aria-label='Quizzes created and quizzes completed selector'>
              <Button
                className={btnStyles.BtnBarBtn}
                onClick={() => setQuizView('created')}
                autoFocus
              >
                Created Quizzes
              </Button>
              <Button
                className={btnStyles.BtnBarBtn}
                onClick={() => setQuizView('completed')}
              >
                Completed Quizzes
              </Button>
          </ButtonGroup>
          {(quizView === 'created') && createdQuizTiles}
          {(quizView === 'completed') && completedQuizTiles}
        </Col>
      </Row>
    </>
  )
}

export default ProfilePage