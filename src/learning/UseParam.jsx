import React from 'react'
import { useParams } from 'react-router-dom'
const UseParam = () => {
  const {name,age} = useParams();
  return (
    <div>
      <pre>
        <h3>Name :</h3>
            <h2>{name}</h2>
        <h3>Age :</h3>
            <h2>{age}</h2>
      </pre>
    </div>
  )
}

export default UseParam