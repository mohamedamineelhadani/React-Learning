import React, { useRef, useState } from "react";
import "./TicTacToe.css";
const TicTacToe = () => {
  const [player,setPlayer] = useState("x")
  const [title, setTitle] = useState(`Tic Tac Toe ( ${player} )`);

  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);
  const boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  function winner(firstBox, secondBox, thirdBox) {
    setTitle(`the ${player} win ! `);
    firstBox.current.style.background = "#000";
    secondBox.current.style.background = "#000";
    thirdBox.current.style.background = "#000";
    setTimeout(() => {
      reset();
    }, 2000);
  }
  function content(box){
    return box.current.textContent;
  }
  function reset() {
    setPlayer("x");
    setTitle(`Tic Tac Toe ( x )`);
    boxes.forEach((box) => {
      box.current.textContent = "";
      box.current.style.background="";
    });
  }
  function boxClick(box) {
    if(box.textContent == ""){
      box.textContent = player;
      const newPlayer =player == "x" ? "0" : "x";
      setPlayer(newPlayer);
      setTitle(`Tic Tac Toe ( ${newPlayer} )`);
      validation();
    }
  }
  function validation(){
    if (content(box1) == content(box2) && content(box2) == content(box3) && content(box1) != "") {
      winner(box1, box2, box3);
    } else if (content(box4) == content(box5) && content(box5) == content(box6) && content(box4) != "") {
      winner(box4, box5, box6);
    } else if (content(box7) == content(box8) && content(box8) == content(box9) && content(box7) != "") {
      winner(box7, box8, box9);
    } else if (content(box1) == content(box4) && content(box4) == content(box7) && content(box1) != "") {
      winner(box1, box4, box7);
    } else if (content(box2) == content(box5) && content(box5) == content(box8) && content(box2) != "") {
      winner(box2, box5, box8);
    } else if (content(box3) == content(box6) && content(box6) == content(box9) && content(box3) != "") {
      winner(box3, box6, box9);
    } else if (content(box1) == content(box5) && content(box5) == content(box9) && content(box1) != "") {
      winner(box1, box5, box9);
    } else if (content(box3) == content(box5) && content(box5) == content(box7) && content(box3) != "") {
      winner(box3, box5, box7);
    }  
  }

  return (
    <div className="tic-tac-toe">
      <h1 className="title">{title}</h1>
      <div className="boxes">
        <div className="box" ref={box1} onClick={(e) => boxClick(e.target)}></div>
        <div className="box" ref={box2} onClick={(e) => boxClick(e.target)}></div>
        <div className="box" ref={box3} onClick={(e) => boxClick(e.target)}></div>
        <div className="box" ref={box4} onClick={(e) => boxClick(e.target)}></div>
        <div className="box" ref={box5} onClick={(e) => boxClick(e.target)}></div>
        <div className="box" ref={box6} onClick={(e) => boxClick(e.target)}></div>
        <div className="box" ref={box7} onClick={(e) => boxClick(e.target)}></div>
        <div className="box" ref={box8} onClick={(e) => boxClick(e.target)}></div>
        <div className="box" ref={box9} onClick={(e) => boxClick(e.target)}></div>
      </div>
      <button className="reset" onClick={reset}> Reset </button>
    </div>
  );
};

export default TicTacToe;
