import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
const Counter = () => {
    const num = useSelector(state => state.num);
    const dispatch = useDispatch();
  return (
    <div >
        <h1>{num}</h1>
        <button onClick={()=>dispatch({type:"INCREMENT"})}>INCREMENT</button>
        <button onClick={()=>dispatch({type:"DECREMENT"})}>DECREMENT</button>
        <button onClick={()=>dispatch({type:"RESET"})}>RESET</button> 
    </div>
  )
}

export default Counter