import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AddCity = () => {
    const contries = useSelector(state => state);
    const dispatch = useDispatch();
    const [code,setCode] = useState("");
    const [city,setCity] = useState({
        name :"",
        district :"",
        population:"",
        capital:""
    });

    function addCity(){ 
        dispatch({type:"AddCity",payload:city,code:code});
    }

  return (
    <div className='add-city'>

        <select onChange={(e)=>setCode(e.target.value)}>
            {contries.map(country=>(
                <option value={country.code}>{country.name}</option>
            ))}
        </select>

        <form onSubmit={(e)=>e.preventDefault()}>
            <input type="text" defaultValue={city.name} placeholder='name' onChange={(e)=>setCity({...city,name:e.target.value})} />
            <input type="text" defaultValue={city.district} placeholder='district' onChange={(e)=>setCity({...city,district:e.target.value})} />
            <input type="text" defaultValue={city.population} placeholder='population' onChange={(e)=>setCity({...city,population:e.target.value})} />
            <input type="text" defaultValue={city.capital} placeholder='capital' onChange={(e)=>setCity({...city,capital:e.target.value})} />
            <button onClick={addCity}>add City</button>
        </form>
    </div>
  )
}

export default AddCity