import React, { useRef, useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [player, setPlayer] = useState("x");
  const [title, setTitle] = useState("Tic Tac Toe ( x )");

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

  const content = (box) => box.current.textContent;

  const reset = () => {
    setPlayer("x");
    setTitle("Tic Tac Toe ( x )");
    boxes.forEach((box) => {
      box.current.textContent = "";
      box.current.style.background = "";
      box.current.classList.remove("box--win");
    });
  };

  const winner = (a, b, c) => {
    setTitle(`Player ${player} wins !`);
    [a, b, c].forEach((box) => box.current.classList.add("box--win"));
    setTimeout(reset, 2000);
  };

  const validation = () => {
    const lines = [
      [box1, box2, box3],
      [box4, box5, box6],
      [box7, box8, box9],
      [box1, box4, box7],
      [box2, box5, box8],
      [box3, box6, box9],
      [box1, box5, box9],
      [box3, box5, box7],
    ];

    for (const [a, b, c] of lines) {
      const v = content(a);
      if (v && v === content(b) && v === content(c)) {
        winner(a, b, c);
        return;
      }
    }
  };

  const boxClick = (box) => {
    if (box.textContent === "") {
      box.textContent = player;
      const next = player === "x" ? "0" : "x";
      setPlayer(next);
      setTitle(`Tic Tac Toe ( ${next} )`);
      validation();
    }
  };

  return (
    <div className="tic-tac-toe">
      <h1 className="tic-tac-toe__title">{title}</h1>

      <div className="tic-tac-toe__boxes">
        {boxes.map((b, i) => (
          <div
            key={i}
            className="box"
            ref={b}
            onClick={(e) => boxClick(e.target)}
          />
        ))}
      </div>

      <button className="tic-tac-toe__reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;