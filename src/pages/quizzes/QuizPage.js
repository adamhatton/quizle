import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import Quiz from './Quiz';


function QuizPage() {
  const { id } = useParams();

  const [quizInfo, setQuizInfo] = useState({});
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
        try {
            const {data} = await axiosReq.get(`/quizzes/${id}`)
            setQuizInfo({
              id: data.id,
              owner: data.owner,
              title: data.title,
              description: data.description,
              category: data.category,
              time_limit_seconds: data.time_limit_seconds,
              created_on: data.created_on,
              updated_on: data.updated_on,
              profile_id: data.profile_id,
              profile_image: data.profile_image,
              like_id: data.like_id,
              score_id: data.score_id,
              score_time: data.score_time,
              likes_count: data.likes_count,
              completed_count: data.completed_count,
            });
            setQuizAnswers([
              { id: 1, hint: data.hint_1, value: data.ans_1, guessed: false },
              { id: 2, hint: data.hint_2, value: data.ans_2, guessed: false },
              { id: 3, hint: data.hint_3, value: data.ans_3, guessed: false },
              { id: 4, hint: data.hint_4, value: data.ans_4, guessed: false },
              { id: 5, hint: data.hint_5, value: data.ans_5, guessed: false },
              { id: 6, hint: data.hint_6, value: data.ans_6, guessed: false },
              { id: 7, hint: data.hint_7, value: data.ans_7, guessed: false },
              { id: 8, hint: data.hint_8, value: data.ans_8, guessed: false },
              { id: 9, hint: data.hint_9, value: data.ans_9, guessed: false },
              { id: 10, hint: data.hint_10, value: data.ans_10, guessed: false },
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
      <Quiz
        {...quizInfo}
        setQuizInfo={setQuizInfo}
        quizAnswers={quizAnswers}
        setQuizAnswers={setQuizAnswers}
      />
    ) : (
      <Asset spinner />
    )}
    </>
  )
}

export default QuizPage