import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [post,setPost] = useState({
        body:"",
        id :null,
        reactions : {likes: 0, dislikes: 0},
        tags: ['history', 'american', 'crime'],
        title: "",
        userId: null,
        views: 0
    })

    function hundllerPost(obj){
        setPost({...post,...obj})
    }

    function add(){
        dispatch({type:"ADD",payload:post})
        navigate("/posts")
    }
  return (
    <div className="add">
        <input type="number" placeholder='id' onChange={(e)=>hundllerPost({id:e.target.value})} />
        <input type="text" placeholder='title' onChange={(e)=>hundllerPost({title:e.target.value})} />
        <input type="text" placeholder='body' onChange={(e)=>hundllerPost({body:e.target.value})} />
        <button onClick={add}>add</button>
    </div>
  )
}

export default AddPost