import React from 'react'
import { useParams } from 'react-router-dom'
const UseNavigate = () => {
  const params = useParams();  
  return (
    <div>{params.name} and {params.age}</div>
  )
}

export default UseNavigate