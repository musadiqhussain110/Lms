// src/pages/Quiz.js
import { useState, useEffect } from "react";
import axios from "../services/axios";

function Quiz({courseId}) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    const fetchQuiz = async () => {
      const res = await axios.get(`/quizzes/${courseId}`, { headers:{Authorization:`Bearer ${token}`} });
      setQuiz(res.data);
      setTimeLeft(res.data.timeLimit*60);
      setAnswers(Array(res.data.questions.length).fill(null));
    };
    fetchQuiz();
  },[]);

  useEffect(()=>{
    if(timeLeft<=0) return;
    const timer = setInterval(()=>setTimeLeft(t=>t-1),1000);
    return ()=>clearInterval(timer);
  },[timeLeft]);

  const handleSubmit = async ()=>{
    // submit answers logic
    console.log(answers);
  };

  if(!quiz) return <p>Loading...</p>;
  return (
    <div>
      <h3>{quiz.title}</h3>
      <p>Time left: {Math.floor(timeLeft/60)}:{timeLeft%60}</p>
      {quiz.questions.map((q,i)=>(
        <div key={i}>
          <p>{q.question}</p>
          {q.options.map((opt,j)=>(
            <label key={j}>
              <input type="radio" checked={answers[i]===j} onChange={()=>setAnswers(a=>{a[i]=j; return [...a];})} />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Quiz;
