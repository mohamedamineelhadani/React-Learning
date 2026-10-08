import React, { useState } from "react";
import "./TaskForm.css";

const AddTask = ({ showAddTask }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [endDate, setEndDate] = useState("");
  const [todoListData, setTodoListData] = useState(
    JSON.parse(localStorage.getItem("TodoListData"))
  );

  const formInfoOrganizer = () => {
    if (title && content && endDate) {
      const task = {
        id: todoListData.length + 1,
        title,
        content,
        start_date: `${new Date()
          .toLocaleDateString()
          .replaceAll("/", "-")} ${new Date().toLocaleTimeString()}`,
        end_date: endDate,
        completed: false,
      };
      const newTodoListData = [...todoListData, task];
      setTodoListData(newTodoListData);
      localStorage.setItem("TodoListData", JSON.stringify(newTodoListData));
      showAddTask(newTodoListData);
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Add Task</h1>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">Content</label>
        <input
          type="text"
          id="content"
          onChange={(e) => setContent(e.target.value)}
        />

        <label htmlFor="end-date">End Date</label>
        <input
          type="datetime-local"
          id="end-date"
          onChange={(e) =>
            setEndDate(
              `${new Date(e.target.value)
                .toLocaleDateString()
                .replaceAll("/", "-")} ${new Date(
                e.target.value
              ).toLocaleTimeString()}`
            )
          }
        />

        <div className="task-form__actions">
          <button type="submit" onClick={formInfoOrganizer}>
            Add
          </button>
          <button type="button" onClick={() => showAddTask()}>
            Skip
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;