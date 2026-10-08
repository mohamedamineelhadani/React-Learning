import React from 'react'

const initState = {
    num:0
}


const Reducer = (state = initState , action) => {
   switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                num: state.num + 1
            };

        case "DECREMENT":
            return {
                ...state,
                num: state.num - 1
            };

        case "RESET":
            return {
                ...state,
                num:0
            };

        default:
            return state;
    }
};

export default Reducer