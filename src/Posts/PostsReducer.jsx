import React from 'react'
import { act } from 'react';

const initState = [];

const PostsReducer = (state= initState , action) => {
    switch(action.type){
        case "ADD_DATA" :
            return action.payload;
        case "DELETE" :
            return state.filter(post => post.id != action.payload);
        case "UPDATE" :
            return [...state.filter(post => post.id != action.payload.id),action.payload];
        case "ADD" :
            return [...state,action.payload];
        case "ADD_LIKE":
            return state.map(post => post.id != action.id ? post : {...post,reactions : {...post.reactions,likes :post.reactions.likes +1}});

        case "ADD_COMMENT":
            return state.map(post => post.id != action.id ? post : {...post, comments:[...post.comments,action.payload]})
        default :
            return state;
    }
}

export default PostsReducer