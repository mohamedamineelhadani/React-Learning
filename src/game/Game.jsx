import { useState } from "react";
import img1 from "./../assets/images/1.png";
import img2 from "./../assets/images/2.png";
import img3 from "./../assets/images/3.png";
import img4 from "./../assets/images/4.png";
import img5 from "./../assets/images/5.png";
import img6 from "./../assets/images/6.png";
import profile from "./../assets/profile/profile.png";
import "./Game.css";

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
    bg: "linear-gradient(135deg, #ff8a1e, #c2570a)",
    score: score1,
  };
  const player2 = {
    number: 2,
    name: "chaimaa",
    bg: "linear-gradient(135deg, #ffb066, #7a3a00)",
    score: score2,
  };

  const changePlayer = () => {
    if (p === 1) {
      setP(2);
      setMessage("player 2");
    } else {
      setP(1);
      setMessage("player 1");
    }
  };

  const seystem = (r1, r2, r3) => {
    if (n <= 10) {
      if (r1 === r2 && r2 === r3) {
        if (p === 1) {
          setScore1(0);
          setMessage(`${player1.name} you are back to 0 !!`);
        } else {
          setScore2(0);
          setMessage(`${player2.name} you are back to 0 !!`);
        }
      } else {
        const total = r1 + r2 + r3 + 3;
        if (p === 1) setScore1(score1 + total);
        else setScore2(score2 + total);
      }
      changePlayer();
      setN(n + 1);
    } else {
      setMessage(
        score1 > score2
          ? `${player1.name} you win !!`
          : `${player2.name} you win !!`
      );
      setScore1(0);
      setScore2(0);
      setN(1);
    }
  };

  const randImages = () => {
    const r = [
      Math.floor(Math.random() * images.length),
      Math.floor(Math.random() * images.length),
      Math.floor(Math.random() * images.length),
    ];
    setRand1(r[0]);
    setRand2(r[1]);
    setRand3(r[2]);
    seystem(r[0], r[1], r[2]);
  };

  const Player = ({ data }) => (
    <div className="player" title={data.name}>
      <div className="player__profile" style={{ background: data.bg }}>
        <img src={profile} alt={data.name} />
        <span className="player__number">{data.number}</span>
      </div>
      <h2 className="player__name">{data.name}</h2>
      <div className="player__score">
        <span className="player__score-label">Score</span>
        <span className="player__score-value">{data.score}</span>
      </div>
    </div>
  );

  return (
    <div className="game-wrap">
      <div className="game-message">{m}</div>

      <div className="game-players">
        <Player data={player1} />
        <span className="game-vs">VS</span>
        <Player data={player2} />
      </div>

      <div className="game-board">
        <div className="game-board__images">
          <img src={images[rand1]} alt={`image ${rand1}`} />
          <img src={images[rand2]} alt={`image ${rand2}`} />
          <img src={images[rand3]} alt={`image ${rand3}`} />
        </div>
        <button className="game-board__btn" onClick={randImages}>
          Play
        </button>
      </div>
    </div>
  );
};

export default Game;