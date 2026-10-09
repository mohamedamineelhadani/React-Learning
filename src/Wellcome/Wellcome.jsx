import React, { useEffect, useRef, useState } from "react";
import "./Wellcome.css";

const GAME_DURATION = 30;   // seconds
const MAX_LIVES = 3;
const SPAWN_MS = 850;       // new ember every 850ms
const EMBER_LIFE = 1600;    // ember disappears after 1.6s

const Welcome = () => {
  const [status, setStatus] = useState("idle"); // idle | playing | over
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem("ember_best") || 0));
  const [lives, setLives] = useState(MAX_LIVES);
  const [time, setTime] = useState(GAME_DURATION);
  const [embers, setEmbers] = useState([]);

  const boardRef = useRef(null);
  const spawnRef = useRef(null);
  const tickRef = useRef(null);
  const idRef = useRef(0);

  /* ========== Lifecycle ========== */
  const start = () => {
    setStatus("playing");
    setScore(0);
    setLives(MAX_LIVES);
    setTime(GAME_DURATION);
    setEmbers([]);
  };

  const stop = (finalScore) => {
    setStatus("over");
    setEmbers([]);
    if (finalScore > best) {
      setBest(finalScore);
      localStorage.setItem("ember_best", finalScore);
    }
  };

  /* ========== Timer ========== */
  useEffect(() => {
    if (status !== "playing") return;

    tickRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(tickRef.current);
          stop(score);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(tickRef.current);
  }, [status]);

  /* ========== Spawner ========== */
  useEffect(() => {
    if (status !== "playing") return;

    spawnRef.current = setInterval(() => {
      spawnEmber();
    }, SPAWN_MS);

    return () => clearInterval(spawnRef.current);
  }, [status]);

  /* ========== Lose a life when ember escapes ========== */
  const loseLife = () => {
    setLives((l) => {
      const next = l - 1;
      if (next <= 0) {
        stop(score);
        return 0;
      }
      return next;
    });
  };

  const spawnEmber = () => {
    const board = boardRef.current;
    if (!board) return;

    const rect = board.getBoundingClientRect();
    const size = 60 + Math.random() * 20;
    const maxX = rect.width - size;
    const maxY = rect.height - size;

    const ember = {
      id: ++idRef.current,
      x: Math.random() * maxX,
      y: Math.random() * maxY,
      size,
      born: Date.now(),
    };

    setEmbers((prev) => [...prev, ember]);

    // auto-remove after life → counts as a miss
    setTimeout(() => {
      setEmbers((prev) => {
        const stillThere = prev.find((e) => e.id === ember.id);
        if (stillThere) loseLife();
        return prev.filter((e) => e.id !== ember.id);
      });
    }, EMBER_LIFE);
  };

  /* ========== Catch ========== */
  const catchEmber = (id) => {
    setEmbers((prev) => prev.filter((e) => e.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div className="ember-game">
      {/* ===== HEADER ===== */}
      <header className="ember-game__head">
        <div className="ember-game__brand">
          <span className="ember-game__dot" />
          Catch the Ember
        </div>

        <div className="ember-game__stats">
          <Stat label="Score" value={score} />
          <Stat label="Best" value={best} />
          <Stat
            label="Lives"
            value={"♥".repeat(lives) + "♡".repeat(MAX_LIVES - lives)}
          />
          <Stat label="Time" value={`${time}s`} />
        </div>
      </header>

      {/* ===== BOARD ===== */}
      <div className="ember-game__board" ref={boardRef}>
        {status === "playing" &&
          embers.map((e) => (
            <button
              key={e.id}
              className="ember"
              style={{
                left: e.x,
                top: e.y,
                width: e.size,
                height: e.size,
              }}
              onClick={() => catchEmber(e.id)}
              aria-label="ember"
            />
          ))}

        {status === "idle" && (
          <div className="ember-game__overlay">
            <h1>Catch the Ember</h1>
            <p>
              Embers pop up — click them fast. Each one fades in{" "}
              {EMBER_LIFE / 1000}s. Miss <strong>3</strong> and it's over.
            </p>
            <button className="ember-game__btn" onClick={start}>
              Start
            </button>
          </div>
        )}

        {status === "over" && (
          <div className="ember-game__overlay">
            <h1>Game Over</h1>
            <p>
              Score: <strong>{score}</strong> · Best: <strong>{best}</strong>
            </p>
            <button className="ember-game__btn" onClick={start}>
              Play Again
            </button>
          </div>
        )}
      </div>

      <p className="ember-game__hint">
        Tip: the more you catch in a row, the more intense it gets.
      </p>
    </div>
  );
};

/* ========== Small stat block ========== */
const Stat = ({ label, value }) => (
  <div className="ember-game__stat">
    <span className="ember-game__stat-label">{label}</span>
    <span className="ember-game__stat-value">{value}</span>
  </div>
);

export default Welcome;