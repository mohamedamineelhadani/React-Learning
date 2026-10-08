import React, { useState } from 'react'
import "./TaskForm.css";
const AddTask = ({showAddTask}) => {
  const [title ,setTitle] = useState("");
  const [content ,setContent] = useState("");
  const [endDate ,setEndDate] = useState("");
  const [todoListData,setTodoListData]=useState(JSON.parse(localStorage.getItem("TodoListData")));

  function formInfoOrganizer(){
    if(title != "" && content != "" && endDate != ""){
      const task = {
          id: todoListData.length + 1,
          title: title,
          content: content,
          start_date:`${new Date().toLocaleDateString().replaceAll("/","-")} ${new Date().toLocaleTimeString()}`,
          end_date: endDate,
          completed: false,
      }
      const newTodoListData =[...todoListData,task];
      setTodoListData(newTodoListData);
      localStorage.setItem("TodoListData",JSON.stringify(newTodoListData));
      showAddTask(newTodoListData);
    }
  }
  return (
    <div className='task-form'>
        <form>
            <h1>Add Task</h1>
            <label htmlFor="title">Title :</label>
            <input type="text" id="title" onChange={(e)=>setTitle(e.target.value)}/>
            <label htmlFor="content">Content :</label>
            <input type="text" id="content" onChange={(e)=>setContent(e.target.value)} />
            <label htmlFor="end-date">End Date :</label>
            <input type="datetime-local" id="end-date" onChange={(e)=>setEndDate(`${new Date(e.target.value).toLocaleDateString().replaceAll("/","-")} ${new Date(e.target.value).toLocaleTimeString()}`)} />
            <input type="submit" value="Click to Add" onClick={(e)=>{
              e.preventDefault();
              formInfoOrganizer();
            }} />
            <input type="button" value="Skip" onClick={(e)=>{
              e.preventDefault();
              showAddTask();
            }} />
        </form>
    </div>
  )
}

export default AddTask