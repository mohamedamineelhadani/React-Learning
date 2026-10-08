import React from 'react'
import {useContext ,useState} from 'react';
import {dataContext} from './Test';
import { useReducer } from 'react';
const Elements = () => {
  const data = useContext(dataContext);

  const [user,setUser] = useState({name: "", age: null});


   const reducer = (state,action) => {
    switch(action.type){
        case "add":
            return [...state,action.payload];
        case "delete" :
            return [...state.filter(item => item.id !== action.payload.id)]
        default:
            return state;
    }
  }

  const initialState = [
    {id: 4, name: "Alice", age: 28},
    {id: 5, name: "Tom", age: 32},
    {id: 6, name: "Sara", age: 27},
  ];
  const [state, dispatch] = useReducer(reducer, initialState);


  function addUser(){
    dispatch({type: "add", payload: {...user, id: state.length + 1}});
    setUser({name: "", age: null});
  }

    function change(input){
        const {name,value} = input;
        setUser({...user, [name]: value});
    }


    function hello(e){
        
        e.preventDefault();
        alert("Hello");
    }



  return (
    <div>
        <h1>Elements</h1>
        <ul>
            {data.map(item => (
                <li key={item.id}>{item.name} - {item.age}</li>
            ))}
        </ul>

        <div className="data">
            <h2>Data from useReducer</h2>
            <ul>
                {state.map(item => (
                    <li key={item.id}>{item.name} - {item.age} 
                        <button onClick={() => dispatch({type: "delete", payload: item})}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>

        <form onSubmit={e => {e.preventDefault(); addUser()}}>
            <input type="text" placeholder='Name' name="name" value={user.name} onChange={(e)=> change(e.target)} />
            <input type="number" placeholder='Age' name="age" value={user.age ?? ""} onChange={(e)=> change(e.target)} />
            <button type='submit'>Add User</button>
        </form>


        <form onSubmit={hello}>
            <button type='submit'>Hello</button>
        </form>
    </div>
  )
}

export default Elements