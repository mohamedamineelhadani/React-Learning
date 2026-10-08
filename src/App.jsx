import { Routes, Route, Link } from "react-router-dom";
import Game from "./Game/Game";
import Quiz from "./Quiz/Quiz";
import Quiz2 from "./Quiz/Quiz2";
import TodoList from "./TodoList/TodoList";
import TicTacToe from "./TicTacToe/TicTacToe";
import POS from "./POS/POS";

function App() {
  return (
    <>
      <nav className="app-nav">
        <Link to="/Game">Game</Link>
        <Link to="/Quiz">Quiz1</Link>
        <Link to="/Quiz2">Quiz2</Link>
        <Link to="/todoList">Todo List</Link>
        <Link to="/ticTacToa">Tic Tac Toe</Link>
        <Link to="/pos">POS</Link>
      </nav>
      <div className="app-content">
        <Routes>
          <Route path="/Game" element={<Game />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Quiz2" element={<Quiz2 />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/ticTacToa" element={<TicTacToe />} />
          <Route path="/pos" element={<POS />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
