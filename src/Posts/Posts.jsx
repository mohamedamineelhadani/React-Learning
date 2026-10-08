import React, { useEffect } from 'react'
import { Link , Routes ,Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DisplayPosts from './DisplayPosts';
import AddPost from './AddPost';
import UpdatePost from './UpdatePost';
const Posts = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    fetch("https://dummyjson.com/posts")
    .then(res => res.json())
    .then(data =>{dispatch({type:"ADD_DATA" ,payload:data.posts})})
  },[])

  return (
    <div className='main'>
        <div className="meun">
          <Link to="/posts">Posts</Link> {" "}
          <Link to="/add post">Add Post</Link>
        </div>

        <Routes>
          <Route path='/posts' element={<DisplayPosts />}></Route>
          <Route path='/add post' element={<AddPost />}></Route>
          <Route path='/update post/:id' element={<UpdatePost />}></Route>
        </Routes>
    </div>
  )
}

export default Posts