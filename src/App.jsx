import { Routes, Route, Link } from "react-router-dom";
import Game from "./game/Game";
import Quiz from "./quiz/Quiz";
import Quiz2 from "./quiz/Quiz2";
import TodoList from "./todoList/TodoList";
import TicTacToe from "./tictactoe/TicTacToe";
import Efm from "./Efm/Efm";
import Products from "./efmProduct/Products";
import UseParam from "./learning/UseParam";
import UseNavigate from "./learning/UseNavigate";

function App() {
  return (
    <>
      <nav className="app-nav">
        <Link to="/Game">Game</Link>
        <Link to="/Quiz">Quiz1</Link>
        <Link to="/Quiz2">Quiz2</Link>
        <Link to="/todoList">Todo List</Link>
        <Link to="/ticTacToa">Tic Tac Toe</Link>
        <Link to="/useParams/mohamed amine/20">useParams</Link>
        <Link to="/efm">EFM</Link>
        <Link to="/products">Products</Link>
      </nav>
      <div className="app-content">
        <Routes>
          <Route path="/Game" element={<Game />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Quiz2" element={<Quiz2 />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/ticTacToa" element={<TicTacToe />} />
          <Route path="/useParams/:name/:age" element={<UseParam />} />
          <Route path="/useNavigate/:name/:age" element={<UseNavigate />} />
          <Route path="/efm" element={<Efm />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
