import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [data] = useSelector(state => state.filter(p => p.id == id));
    const [post,setPost] = useState(data);




    function hundllerPost(obj){
        setPost({...post,...obj,reactions:{...data.reactions,likes:0}})
    }

    function update(){
        dispatch({type:"UPDATE",payload:post})
        navigate("/posts")
    }


  return (
    <div className="add">
        <input type="number" placeholder='id' defaultValue={post.id} onChange={(e)=>hundllerPost({id:e.target.value})} />
        <input type="text" placeholder='title' defaultValue={post.title} onChange={(e)=>hundllerPost({title:e.target.value})} />
        <input type="text" placeholder='body' defaultValue={post.body} onChange={(e)=>hundllerPost({body:e.target.value})} />
        <button onClick={update}>add</button>
    </div>
  )
}

export default UpdatePost