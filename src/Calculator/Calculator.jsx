import React, { useEffect, useState } from "react";
import "./Calculator.css";

/* ========== Funny reactions ========== */
const REACTIONS = {
  init: ["Hi 👋", "Ready?", "Do some math!", "I'm bored...", "Tap something."],
  number: ["ok...", "noted.", "boring.", "I've seen better.", "next?"],
  operator: ["oh, spicing it up!", "careful now...", "bold move.", "hmm 🤔"],
  equals: [
    "Ta-da! 🎩",
    "Boom 💥",
    "Are you happy now?",
    "Wrote it down for you.",
    "I did it... barely.",
    "Easy math. Try physics next.",
  ],
  equals52: [
    "You typed 52 on purpose, didn't you? 🤨",
    "52 again. Original.",
    "I knew it. You're trolling me.",
  ],
  clear: ["Wiped! 🧹", "Fresh start.", "Forget it ever happened."],
  divideZero: [
    "You broke the universe 💀",
    "∞... no thanks.",
    "Nope. Not today.",
  ],
  big: [
    "That's a big number. My brain hurts.",
    "Whoa, slow down scientist.",
    "Are you calculating the universe?",
  ],
  negative: ["Negative? Feeling down?", "Oof, that's a sad result.", "Below zero 🌨️"],
  idle: [
    "Still waiting...",
    "Hello? 👀",
    "I'll just sit here then.",
    "Any day now.",
    "You ok?",
  ],
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [a, setA] = useState(null);
  const [op, setOp] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [mood, setMood] = useState(pick(REACTIONS.init));
  const [history, setHistory] = useState([]);
  const [jokeMode, setJokeMode] = useState(true);

  /* ========== Idle nagging ========== */
  useEffect(() => {
    const t = setInterval(() => {
      setMood(pick(REACTIONS.idle));
    }, 12000);
    return () => clearInterval(t);
  }, []);

  /* ========== Core logic ========== */
  const inputNumber = (n) => {
    if (waiting) {
      setDisplay(n);
      setWaiting(false);
    } else {
      setDisplay(display === "0" ? n : display + n);
    }
    if (jokeMode) setMood(pick(REACTIONS.number));
  };

  const inputDot = () => {
    if (waiting) {
      setDisplay("0.");
      setWaiting(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const inputOp = (nextOp) => {
    const current = parseFloat(display);
    if (op && waiting) {
      setOp(nextOp);
      if (jokeMode) setMood(pick(REACTIONS.operator));
      return;
    }
    if (a == null) {
      setA(current);
    } else if (op) {
      const result = compute(a, current, op);
      setA(result);
      setDisplay(String(result));
    }
    setOp(nextOp);
    setWaiting(true);
    if (jokeMode) setMood(pick(REACTIONS.operator));
  };

  const compute = (x, y, o) => {
    switch (o) {
      case "+": return x + y;
      case "-": return x - y;
      case "×": return x * y;
      case "÷":
        if (y === 0) {
          if (jokeMode) setMood(pick(REACTIONS.divideZero));
          return "💀";
        }
        return x / y;
      default: return y;
    }
  };

  const equals = () => {
    if (op == null || a == null) return;
    const b = parseFloat(display);
    const result = compute(a, b, op);

    if (result === "💀") {
      setDisplay("💀");
      setA(null);
      setOp(null);
      setWaiting(true);
      return;
    }

    const rounded = Number.isInteger(result) ? result : +result.toFixed(6);
    setDisplay(String(rounded));
    setHistory((h) =>
      [`${a} ${op} ${b} = ${rounded}`, ...h].slice(0, 5)
    );
    setA(null);
    setOp(null);
    setWaiting(true);

    /* funny mood */
    if (!jokeMode) return;
    if (rounded === 52) setMood(pick(REACTIONS.equals52));
    else if (rounded < 0) setMood(pick(REACTIONS.negative));
    else if (Math.abs(rounded) > 1_000_000) setMood(pick(REACTIONS.big));
    else setMood(pick(REACTIONS.equals));
  };

  const clear = () => {
    setDisplay("0");
    setA(null);
    setOp(null);
    setWaiting(false);
    if (jokeMode) setMood(pick(REACTIONS.clear));
  };

  const backspace = () => {
    if (waiting) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const percent = () => {
    const v = parseFloat(display) / 100;
    setDisplay(String(v));
  };

  const negate = () => {
    if (display === "0") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  };

  /* ========== Keyboard ========== */
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key;
      if (/^[0-9]$/.test(k)) inputNumber(k);
      else if (k === ".") inputDot();
      else if (k === "+") inputOp("+");
      else if (k === "-") inputOp("-");
      else if (k === "*") inputOp("×");
      else if (k === "/") { e.preventDefault(); inputOp("÷"); }
      else if (k === "Enter" || k === "=") { e.preventDefault(); equals(); }
      else if (k === "Backspace") backspace();
      else if (k === "Escape") clear();
      else if (k === "%") percent();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="calc">
      <header className="calc__head">
        <div className="calc__brand">
          <span className="calc__dot" />
          Drama Calculator
        </div>

        <button
          className={`calc__toggle ${jokeMode ? "on" : ""}`}
          onClick={() => setJokeMode((j) => !j)}
          title="Toggle jokes"
        >
          {jokeMode ? "😂 Jokes ON" : "😐 Jokes OFF"}
        </button>
      </header>

      <div className="calc__screen">
        <div className="calc__mood">{mood}</div>
        <div className="calc__display">
          {display === "💀" ? <span className="calc__dead">💀</span> : display}
        </div>
      </div>

      <div className="calc__keys">
        <button className="key key--fn" onClick={clear}>AC</button>
        <button className="key key--fn" onClick={backspace}>⌫</button>
        <button className="key key--fn" onClick={percent}>%</button>
        <button className="key key--op" onClick={() => inputOp("÷")}>÷</button>

        <button className="key" onClick={() => inputNumber("7")}>7</button>
        <button className="key" onClick={() => inputNumber("8")}>8</button>
        <button className="key" onClick={() => inputNumber("9")}>9</button>
        <button className="key key--op" onClick={() => inputOp("×")}>×</button>

        <button className="key" onClick={() => inputNumber("4")}>4</button>
        <button className="key" onClick={() => inputNumber("5")}>5</button>
        <button className="key" onClick={() => inputNumber("6")}>6</button>
        <button className="key key--op" onClick={() => inputOp("-")}>−</button>

        <button className="key" onClick={() => inputNumber("1")}>1</button>
        <button className="key" onClick={() => inputNumber("2")}>2</button>
        <button className="key" onClick={() => inputNumber("3")}>3</button>
        <button className="key key--op" onClick={() => inputOp("+")}>+</button>

        <button className="key key--zero" onClick={() => inputNumber("0")}>0</button>
        <button className="key" onClick={inputDot}>.</button>
        <button className="key key--eq" onClick={equals}>=</button>
      </div>

      {history.length > 0 && (
        <div className="calc__history">
          <span className="calc__history-label">Recent</span>
          <ul>
            {history.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="calc__tip">
        Tip: try <strong>6 + 7 =</strong>, or divide by zero for chaos 💀
      </p>
    </div>
  );
};

export default Calculator;