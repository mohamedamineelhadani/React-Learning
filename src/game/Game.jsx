import { useState } from "react";
import img1 from "./../assets/images/1.png";
import img2 from "./../assets/images/2.png";
import img3 from "./../assets/images/3.png";
import img4 from "./../assets/images/4.png";
import img5 from "./../assets/images/5.png";
import img6 from "./../assets/images/6.png";
import "./Game.css";
import Player from "./Player";
import Message from "./Message";
import Messagev2 from "./Messagev2";
const Game = () => {
  const [rand1, setRand1] = useState(0);
  const [rand2, setRand2] = useState(0);
  const [rand3, setRand3] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [p, setP] = useState(1);
  const [n, setN] = useState(1);
  const [m, setMessage] = useState("player 1 start the game !!");
  const images = [img1, img2, img3, img4, img5, img6];
  const player1 = {
    number: 1,
    name: "mhamed amine",
    bg: "linear-gradient(90deg, #ff2600ff 0%, #ffae00ff 35%, #d9ff00ff 100%)",
    score: score1,
  };
  const player2 = {
    number: 2,
    name: "chaimaa",
    bg: "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)",
    score: score2,
  };

  const randImages = () => {
    const randomValue = [
      Math.floor(Math.random() * images.length),
      Math.floor(Math.random() * images.length),
      Math.floor(Math.random() * images.length),
    ];
    setRand1(randomValue[0]);
    setRand2(randomValue[1]);
    setRand3(randomValue[2]);
    seystem(randomValue[0], randomValue[1], randomValue[2]);
  };

  function changePlayer() {
    if (p == 1) {
      setP(2);
      setMessage("player 2");
    } else {
      setP(1);
      setMessage("player 1");
    }
  }

  const seystem = (r1, r2, r3) => {
    if (n <= 10) {
      if (r1 == r2 && r2 == r3) {
        if (p == 1) {
          setScore1(0);
          setMessage(`${player1.name} you are back to 0 !!`);
        }
        if (p == 2) {
          setScore2(0);
          setMessage(`${player2.name} you are back to 0 !!`);
        }
      } else {
        let total = r1 + r2 + r3 + 3;
        if (p == 1) {
          setScore1(score1 + total);
        } else if (p == 2) {
          setScore2(score2 + total);
        }
      }
      changePlayer();
      setN(n + 1);
    } else {
      if (score1 > score2) {
        setMessage(`${player1.name} you win !!`);
      } else {
        setMessage(`${player2.name} you are win !!`);
      }
      setScore1(0);
      setScore2(0);
      setN(1);
    }
  };
  return (
    <div className="container">

      <Message text={`${m}`} />
      <div className="players">
        <Player p={player1} />
        <h1 className="vsMessage">{`${player1.name} VS ${player2.name}`}</h1>
        <Player p={player2} />
      </div>
      <div className="game">
        <div className="images">
          <img src={images[rand1]} alt={`image number ${rand1}`} />
          <img src={images[rand2]} alt={`image number ${rand2}`} />
          <img src={images[rand3]} alt={`image number ${rand3}`} />
        </div>
        <button onClick={() => randImages()}>click</button>
      </div>
    </div>
  );
};
export default Game;
