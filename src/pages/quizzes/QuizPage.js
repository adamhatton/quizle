import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';

function QuizPage() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
        try {
            const {data} = await axiosReq.get(`/quizzes/${id}`)
            setQuiz({results: [data]});
        } catch(err){
            console.log(err);
        }
    }
    handleMount();

  }, [id]);

  return (
    <div>QuizPage</div>
  )
}

export default QuizPage