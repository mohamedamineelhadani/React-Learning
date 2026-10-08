import { createStore } from "redux";
import PostsReducer from "./PostsReducer";



const PostsStore = createStore(PostsReducer);

export default PostsStore;