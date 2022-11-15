import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import Quiz from './Quiz';


function QuizPage() {
  const { id } = useParams();

  const [quizInfo, setQuizInfo] = useState({});
  const [quizHints, setQuizHints] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState([
    { ans_1: '' },
    { ans_2: '' },
    { ans_3: '' },
    { ans_4: '' },
    { ans_5: '' },
    { ans_6: '' },
    { ans_7: '' },
    { ans_8: '' },
    { ans_9: '' },
    { ans_10: '' },
  ]);

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
              is_owner: data.is_owner,
              profile_id: data.profile_id,
              profile_image: data.profile_image,
              like_id: data.like_id,
              score_id: data.score_id,
            });
            setQuizHints([
              data.hint_1,
              data.hint_2,
              data.hint_3,
              data.hint_4,
              data.hint_5,
              data.hint_6,
              data.hint_7,
              data.hint_8,
              data.hint_9,
              data.hint_10,
            ]);
            setQuizAnswers([
              { id: 1, value: data.ans_1, guessed: false },
              { id: 2, value: data.ans_2, guessed: false },
              { id: 3, value: data.ans_3, guessed: false },
              { id: 4, value: data.ans_4, guessed: false },
              { id: 5, value: data.ans_5, guessed: false },
              { id: 6, value: data.ans_6, guessed: false },
              { id: 7, value: data.ans_7, guessed: false },
              { id: 8, value: data.ans_8, guessed: false },
              { id: 9, value: data.ans_9, guessed: false },
              { id: 10, value: data.ans_10, guessed: false },
            ])
        } catch(err){
            console.log(err);
        }
    }
    handleMount();

  }, [id]);

  return (
    <div>
      <Quiz
        {...quizInfo}
        setQuizInfo={setQuizInfo}
        quizHints={quizHints}
        quizAnswers={quizAnswers}
        setQuizAnswers={setQuizAnswers}
      />
    </div>
  )
}

export default QuizPage