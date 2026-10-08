import React, { useRef, useState } from "react";
import "./Quiz.css";
import { QuizData } from "../assets/QuizData";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(QuizData[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const options = [option1, option2, option3, option4];

  const checkCorrect = (e, correct) => {
    if (!lock) {
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
    if (lock) {
      if (index === QuizData.length - 1) {
        setResult(true);
        return;
      }
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuestion(QuizData[newIndex]);
      setLock(false);
      options.forEach((option) => {
        option.current.classList.remove("true");
        option.current.classList.remove("false");
      });
    }
  };

  const reset = () => {
    setResult(false);
    setScore(0);
    setLock(false);
    setQuestion(QuizData[0]);
    setIndex(0);
  };

  return (
    <div className="quiz">
      <div className="quiz__title">
        <h1>Quiz App</h1>
      </div>

      {result ? (
        <div className="quiz__result">
          <h1 className="quiz__score">
            Your Score is {score} / {QuizData.length}
          </h1>
          <button className="quiz__btn" onClick={reset}>
            Reset
          </button>
        </div>
      ) : (
        <>
          <div className="quiz__question">
            <p>
              {index + 1} - {question.question}
            </p>
          </div>

          <div className="quiz__answers">
            <button
              ref={option1}
              className="quiz__btn quiz__btn--answer"
              onClick={(e) => checkCorrect(e, 1)}
            >
              {question.answer1}
            </button>
            <button
              ref={option2}
              className="quiz__btn quiz__btn--answer"
              onClick={(e) => checkCorrect(e, 2)}
            >
              {question.answer2}
            </button>
            <button
              ref={option3}
              className="quiz__btn quiz__btn--answer"
              onClick={(e) => checkCorrect(e, 3)}
            >
              {question.answer3}
            </button>
            <button
              ref={option4}
              className="quiz__btn quiz__btn--answer"
              onClick={(e) => checkCorrect(e, 4)}
            >
              {question.answer4}
            </button>
          </div>

          <div className="quiz__next">
            <button className="quiz__btn quiz__btn--next" onClick={next}>
              Next
            </button>
            <p className="quiz__progress">
              {index + 1} / {QuizData.length} questions
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;