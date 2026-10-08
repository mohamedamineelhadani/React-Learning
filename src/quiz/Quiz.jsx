import React, {useRef, useState } from "react";
import "./Quiz.css";
import { QuizData } from "./../assets/QuizData";


const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuetion] = useState(QuizData[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const options = [option1, option2, option3, option4];

  const checkCorrect = (e, correct) => {
    if (lock === false) {
      if (question.correct === correct) {
        e.target.classList.add("true");
        setScore(score + 1);
      } else {
        e.target.classList.add("false");
        options[question.correct - 1].current.classList.add("true");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === QuizData.length - 1) {
        setResult(true);
        return 0;
      }
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuetion(QuizData[newIndex]);
      setLock(false);
      options.map((option) => {
        option.current.classList.remove("true");
        option.current.classList.remove("false");
        return null;
      });
    }
  };

  const reset = () => {
    setResult(false);
    setScore(0);
    setLock(false);
    setQuetion(QuizData[0]);
    setIndex(0);
    setTimer(15);
  };

  return (
    <>
      <div className="quiz">
        <div className="title">
          <h1>Quiz App </h1>
        </div>
        {result ? 
          <div className="result">
            <h1 className="score">Your Score is {score} than {QuizData.length}</h1>
            <button className="reset btn" onClick={() => reset()}>Reset</button>
          </div>
         : 
          <>
            <div className="quetion"><p>{index + 1} - {question.question}</p></div>
            <div className="buttons">
              <button ref={option1} className="answer-btn btn" onClick={(e) => checkCorrect(e, 1)}>{question.answer1}</button>
              <button ref={option2} className="answer-btn btn" onClick={(e) => checkCorrect(e, 2)}>{question.answer2}</button>
              <button ref={option3} className="answer-btn btn" onClick={(e) => checkCorrect(e, 3)}>{question.answer3}</button>
              <button ref={option4} className="answer-btn btn" onClick={(e) => checkCorrect(e, 4)}>{question.answer4}</button>
            </div>
            <div className="next">
              <button className="next-quiz btn" onClick={() => next()}>Next</button>
              <p className="next-steps">{index + 1} / {QuizData.length} quetions</p>
            </div>
          </>
        }
      </div>
    </>
  );
};
export default Quiz;
