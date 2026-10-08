import React, { useRef, useState } from 'react'
import { QuizData } from '../assets/QuizData';
import "./Quiz2.css";
const Quiz2 = () => {
    const [index,setIndex]=useState(0);
    const [quiz,setQuiz]=useState(QuizData[index]);
    const [lock,setLock]= useState(false);
    const [end,setEnd]= useState(false);
    const [res,setRes]= useState(0);


    const btn1 = useRef(null);
    const btn2 = useRef(null);
    const btn3 = useRef(null);
    const btn4 = useRef(null);

    const btns = [btn1,btn2,btn3,btn4];

    function back(){
        btns.forEach(btn=>{
            btn.current.classList.remove("true");
            btn.current.classList.remove("false");
        })
    }

    function next(){
        if(lock){
            if(index < QuizData.length - 1){
                const newIndex = index +1;
                setIndex(newIndex);
                setQuiz(QuizData[newIndex])
                setLock(false);
            }else{
                setEnd(true)
            }
            back()
        }

    }

    function check(btn,n){
        if(!lock){
            if(n === quiz.correct ){
                btn.classList.add("true");
                setRes(res + 1);
            }else{
                btn.classList.add("false");
                btns.forEach(b =>{
                    if(Number(b.current.id) === quiz.correct){
                        b.current.classList.add("true");
                    }
                })
            }
            setLock(true);
        }
    }

    function reset(){
        let newIndex = 0;
        setIndex(newIndex);
        setQuiz(QuizData[newIndex]);
        setEnd(false);
        setRes(0);
        setLock(false);
    }

  return (
    <div className='quiz-container'>
        { end ?
            <>
                <h1>you are finich</h1>
                <p>your result : <strong>{res}</strong></p>
                <button className='reset-btn' onClick={reset}>Reset</button>
            </>
            :
            <>
                <h1>{quiz.question}</h1>
                <h1>{`( ${index + 1} / ${QuizData.length} )`}</h1>
                <div className="answers">
                    <button className='quiz-btn' ref={btn1} onClick={(e)=>check(e.target,1)} id={1} >{quiz.answer1}</button>
                    <button className='quiz-btn' ref={btn2} onClick={(e)=>check(e.target,2)} id={2} >{quiz.answer2}</button>
                    <button className='quiz-btn' ref={btn3} onClick={(e)=>check(e.target,3)} id={3} >{quiz.answer3}</button>
                    <button className='quiz-btn' ref={btn4} onClick={(e)=>check(e.target,4)} id={4} >{quiz.answer4}</button>
                </div>

                <button className='next-btn' onClick={next}>next</button>
            </>
        }
    </div>
  )
}

export default Quiz2 ;