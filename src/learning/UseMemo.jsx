import React, { useState } from 'react'

const UseMemo = ({css}) => {
    const [age , setAge]=useState(18);
    const [n , setN]=useState(0);
    let i = 0;

    function updateAge(){
        setAge(age + 1)
    }
    function updateN(){
        setN( n + 1)
    }
  return (
    <div style={css}>
        <h1>Age : {age}</h1>
        <h1>Number : {n} </h1>
        <button onClick={updateAge}>plus 1 to age</button>
        <button onClick={updateN}>plus 1 to number</button>
    </div>
  )
}

export default UseMemo