import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const DisplayPosts = () => {
    const data = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    if(!data.length){
        return <h1>loading ...</h1>
    }

  return (
    <div className="posts">
      {data.map(post => (
        <div className="post" key={post.id}>
            <h2>Views : {post.views}</h2>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <div className="buttons">
                <button onClick={()=>dispatch({type:"ADD_LIKE",id:post.id})}>Likes {post.reactions.likes}</button>
                <button onClick={()=>dispatch({type:"DELETE",payload:post.id})}>Delete</button>
                <button onClick={()=>navigate(`/update post/${post.id}`)}>Update</button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayPosts;
