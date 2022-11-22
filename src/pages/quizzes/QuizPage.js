import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import Quiz from './Quiz';
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/Utils';
import Comment from '../comments/Comment';

/* Component to obtain quiz information and display it*/
function QuizPage() {
  const { id } = useParams();

  const [quizInfo, setQuizInfo] = useState({});
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [comments, setComments] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;


  // On mount get quiz information and set Info and Answers state variables
  useEffect(() => {
    const handleMount = async () => {
        try {
            const [ {data: quiz}, {data: comments} ] = await Promise.all([
              axiosReq.get(`/quizzes/${id}`),
              axiosReq.get(`/comments/?quiz=${id}`)
            ])
            setComments(comments);
            setQuizInfo({
              id: quiz.id,
              owner: quiz.owner,
              title: quiz.title,
              description: quiz.description,
              category: quiz.category,
              time_limit_seconds: quiz.time_limit_seconds,
              created_on: quiz.created_on,
              updated_on: quiz.updated_on,
              profile_id: quiz.profile_id,
              profile_image: quiz.profile_image,
              like_id: quiz.like_id,
              score_id: quiz.score_id,
              score_time: quiz.score_time,
              likes_count: quiz.likes_count,
              comments_count: quiz.comments_count,
              completed_count: quiz.completed_count,
            });
            setQuizAnswers([
              { id: 1, hint: quiz.hint_1, value: quiz.ans_1, guessed: false, revealed: false },
              { id: 2, hint: quiz.hint_2, value: quiz.ans_2, guessed: false, revealed: false },
              { id: 3, hint: quiz.hint_3, value: quiz.ans_3, guessed: false, revealed: false },
              { id: 4, hint: quiz.hint_4, value: quiz.ans_4, guessed: false, revealed: false },
              { id: 5, hint: quiz.hint_5, value: quiz.ans_5, guessed: false, revealed: false },
              { id: 6, hint: quiz.hint_6, value: quiz.ans_6, guessed: false, revealed: false },
              { id: 7, hint: quiz.hint_7, value: quiz.ans_7, guessed: false, revealed: false },
              { id: 8, hint: quiz.hint_8, value: quiz.ans_8, guessed: false, revealed: false },
              { id: 9, hint: quiz.hint_9, value: quiz.ans_9, guessed: false, revealed: false },
              { id: 10, hint: quiz.hint_10, value: quiz.ans_10, guessed: false, revealed: false },
            ]);
            setHasLoaded(true);
        } catch(err){
            console.log(err);
        }
    }
    handleMount();

  }, [id]);

  return (
    <>
    { hasLoaded ? (
    <>
      <Quiz
        {...quizInfo}
        setQuizInfo={setQuizInfo}
        quizAnswers={quizAnswers}
        setQuizAnswers={setQuizAnswers}
        mobile
      />
      {currentUser ? (
        <CommentCreateForm
        profile_id={currentUser.profile_id}
        profileImage={profile_image}
        quiz={id}
        setQuizInfo={setQuizInfo}
        setComments={setComments}
      />
      ) : comments.results.length ? (
        "Comments"
      ) : null}
      {comments.results.length ? (
        <InfiniteScroll
          children={comments.results.map((comment) => (
            <Comment
              key={comment.id}
              {...comment} 
              setQuizInfo={setQuizInfo}
              setComments={setComments}
            />
          ))}
          dataLength={comments.results.length}
          loader={<Asset spinner />}
          hasMore={!!comments.next}
          next={() => fetchMoreData(comments, setComments)}
        />
      ) : currentUser ? (
        <Container className='text-center'>
          <p>No comments yet, be the first to comment!</p>
        </Container>
        
      ) : (
        <Container className='text-center mt-4'>
          <p>No comments yet, login to add a comment!</p>
        </Container>
      )}
    </>
    ) : (
      <Container className='text-center'>
        <Asset spinner />
      </Container>
    )}
    </>
  )
}

export default QuizPage