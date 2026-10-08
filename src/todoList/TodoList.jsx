import React, { useEffect, useState } from "react";
import "./TodoList.css";
import AddTask from "./AddTask";
import EditTask from "./EditTask";

const TodoList = () => {
///////////////////////////////////
  const [todoListData,setTodoListData]=useState([]);
  const [addTask,setAddTask]= useState(false);
  const [editTask,setEditTask]= useState(false);
  const [editTaskData,setEditTaskData] = useState({});

/////////////////////////////////
  useEffect(()=>{
    if(localStorage.getItem("TodoListData") === null){
      localStorage.setItem("TodoListData",JSON.stringify([]))
    }else{
      setTodoListData(JSON.parse(localStorage.getItem("TodoListData")))
    }
  },[])
////////////////////////////////////

  function showAddTask(newData = todoListData){
    setAddTask(addTask ? false : true);
    setTodoListData(newData);
  }
  function showEditTask(newData = todoListData){
    setEditTask(editTask ? false : true);
    setTodoListData(newData);
  }

///////////////////////////// 
  function add(){
    showAddTask()
  }
  function edit(task){
    setEditTaskData(task);
    showEditTask();
  }
////////////////////////////////
  function done(id){
    todoListData.forEach(task =>{
        if(task.id === id){
            task.completed =true;
        }
    })
    const newTodoListData =[...todoListData];
    setTodoListData(newTodoListData);
    localStorage.setItem("TodoListData",JSON.stringify(newTodoListData));
  }

  function deleteTask(id){
    const newTodoListData =todoListData.filter(task => task.id != id);
    setTodoListData(newTodoListData);
    localStorage.setItem("TodoListData",JSON.stringify(newTodoListData));
  }
/////////////////////////////////////////////

  return (
    <div className="todo-list">
        {addTask ? <AddTask showAddTask={showAddTask}  /> : <></>}
        {editTask ? <EditTask showEditTask={showEditTask} editTaskData={editTaskData} /> : <></>}
      <div className="header">
        <h1>Todo List</h1>
        <button onClick={()=>add()}>Add</button>
      </div>

      <div className="tasks">
        {todoListData.map((task) => (
          <div className={`task ${task.completed ? "completed" : "not-completed"}`} key={task.id} title={`task ${task.id}`}>
            <div className="task-info">
              <h2 className="task-title">{task.title}</h2>
              <p className="task-content">{task.content}</p>
              <div className="task-dates">
                <span className="start-date">{task.start_date}</span>
                <span className="end-date">{task.end_date}</span>
              </div>
            </div>
            <div className="task-tools">
              <button onClick={()=>done(task.id)}>Done</button>
              <button onClick={()=>edit(task)}>Edit</button>
              <button onClick={()=>deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <p className="mintivation-msg">Don't give up !!</p>
      </div>
    </div>
  );
};

export default TodoList;
