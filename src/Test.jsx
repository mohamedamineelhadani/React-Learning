import React from 'react'
import Elements from './Elements';

import {createContext} from 'react';

export const dataContext = createContext();

const Test = () => {
    const data = [
        {id: 1, name: "John", age: 30},
        {id: 2, name: "Jane", age: 25},
        {id: 3, name: "Bob", age: 35}
    ];
  return (
    <dataContext.Provider value={data}>
        <Elements />
    </dataContext.Provider>
  )
}

export default Test