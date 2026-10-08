import React, { useState } from "react";
import "./TaskForm.css";

const EditTask = ({ showEditTask, editTaskData }) => {
  const [title, setTitle] = useState(editTaskData.title);
  const [content, setContent] = useState(editTaskData.content);
  const [endDate, setEndDate] = useState(editTaskData.end_date);
  const [todoListData, setTodoListData] = useState(
    JSON.parse(localStorage.getItem("TodoListData"))
  );

  const formInfoOrganizer = () => {
    if (title && content && endDate) {
      todoListData.forEach((task) => {
        if (task.id === editTaskData.id) {
          task.title = title;
          task.content = content;
          task.end_date = endDate;
          task.completed = false;
        }
      });
      const newTodoListData = [...todoListData];
      setTodoListData(newTodoListData);
      localStorage.setItem("TodoListData", JSON.stringify(newTodoListData));
      showEditTask(newTodoListData);
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Edit Task</h1>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">Content</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label htmlFor="end-date">End Date — {endDate}</label>
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
            Edit
          </button>
          <button type="button" onClick={() => showEditTask()}>
            Skip
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;