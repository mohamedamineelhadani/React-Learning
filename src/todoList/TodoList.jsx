import React, { useEffect, useState } from "react";
import "./TodoList.css";
import AddTask from "./AddTask";
import EditTask from "./EditTask";

const TodoList = () => {
  const [todoListData, setTodoListData] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [editTaskData, setEditTaskData] = useState({});

  useEffect(() => {
    if (localStorage.getItem("TodoListData") === null) {
      localStorage.setItem("TodoListData", JSON.stringify([]));
    } else {
      setTodoListData(JSON.parse(localStorage.getItem("TodoListData")));
    }
  }, []);

  const showAddTask = (newData = todoListData) => {
    setAddTask((v) => !v);
    setTodoListData(newData);
  };

  const showEditTask = (newData = todoListData) => {
    setEditTask((v) => !v);
    setTodoListData(newData);
  };

  const edit = (task) => {
    setEditTaskData(task);
    showEditTask();
  };

  const done = (id) => {
    todoListData.forEach((task) => {
      if (task.id === id) task.completed = true;
    });
    const newTodoListData = [...todoListData];
    setTodoListData(newTodoListData);
    localStorage.setItem("TodoListData", JSON.stringify(newTodoListData));
  };

  const deleteTask = (id) => {
    const newTodoListData = todoListData.filter((task) => task.id !== id);
    setTodoListData(newTodoListData);
    localStorage.setItem("TodoListData", JSON.stringify(newTodoListData));
  };

  return (
    <div className="todo-list">
      {addTask && <AddTask showAddTask={showAddTask} />}
      {editTask && (
        <EditTask showEditTask={showEditTask} editTaskData={editTaskData} />
      )}

      <div className="todo-list__header">
        <h1>Todo List</h1>
        <button className="todo-list__add" onClick={() => showAddTask()}>
          Add
        </button>
      </div>

      <div className="todo-list__tasks">
        {todoListData.map((task) => (
          <div
            key={task.id}
            title={`task ${task.id}`}
            className={`task ${task.completed ? "task--done" : "task--todo"}`}
          >
            <div className="task__info">
              <h2 className="task__title">{task.title}</h2>
              <p className="task__content">{task.content}</p>
              <div className="task__dates">
                <span className="task__date task__date--start">
                  {task.start_date}
                </span>
                <span className="task__date task__date--end">
                  {task.end_date}
                </span>
              </div>
            </div>

            <div className="task__tools">
              <button onClick={() => done(task.id)}>Done</button>
              <button onClick={() => edit(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="todo-list__footer">
        <p>Don't give up !!</p>
      </div>
    </div>
  );
};

export default TodoList;