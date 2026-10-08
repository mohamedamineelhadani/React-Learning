import React, { useRef, useState } from "react";
import { QuizData } from "../assets/QuizData";
import "./Quiz2.css";

const Quiz2 = () => {
  const [index, setIndex] = useState(0);
  const [quiz, setQuiz] = useState(QuizData[index]);
  const [lock, setLock] = useState(false);
  const [end, setEnd] = useState(false);
  const [res, setRes] = useState(0);

  const btn1 = useRef(null);
  const btn2 = useRef(null);
  const btn3 = useRef(null);
  const btn4 = useRef(null);
  const btns = [btn1, btn2, btn3, btn4];

  const clearStyles = () => {
    btns.forEach((b) => {
      b.current?.classList.remove("true");
      b.current?.classList.remove("false");
    });
  };

  const next = () => {
    if (!lock) return;
    if (index < QuizData.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuiz(QuizData[newIndex]);
      setLock(false);
    } else {
      setEnd(true);
    }
    clearStyles();
  };

  const check = (btn, n) => {
    if (lock) return;
    if (n === quiz.correct) {
      btn.classList.add("true");
      setRes(res + 1);
    } else {
      btn.classList.add("false");
      btns.forEach((b) => {
        if (Number(b.current.id) === quiz.correct) {
          b.current.classList.add("true");
        }
      });
    }
    setLock(true);
  };

  const reset = () => {
    setIndex(0);
    setQuiz(QuizData[0]);
    setEnd(false);
    setRes(0);
    setLock(false);
  };

  return (
    <div className="quiz2">
      {end ? (
        <div className="quiz2__result">
          <h1>You are finished</h1>
          <p>
            Your result : <strong>{res}</strong> / {QuizData.length}
          </p>
          <button className="quiz2__btn" onClick={reset}>
            Reset
          </button>
        </div>
      ) : (
        <>
          <h1 className="quiz2__question">{quiz.question}</h1>
          <span className="quiz2__progress">
            {index + 1} / {QuizData.length}
          </span>

          <div className="quiz2__answers">
            <button
              className="quiz2__btn quiz2__btn--answer"
              ref={btn1}
              id={1}
              onClick={(e) => check(e.target, 1)}
            >
              {quiz.answer1}
            </button>
            <button
              className="quiz2__btn quiz2__btn--answer"
              ref={btn2}
              id={2}
              onClick={(e) => check(e.target, 2)}
            >
              {quiz.answer2}
            </button>
            <button
              className="quiz2__btn quiz2__btn--answer"
              ref={btn3}
              id={3}
              onClick={(e) => check(e.target, 3)}
            >
              {quiz.answer3}
            </button>
            <button
              className="quiz2__btn quiz2__btn--answer"
              ref={btn4}
              id={4}
              onClick={(e) => check(e.target, 4)}
            >
              {quiz.answer4}
            </button>
          </div>

          <button className="quiz2__btn quiz2__btn--next" onClick={next}>
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz2;