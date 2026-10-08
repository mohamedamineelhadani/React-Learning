import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux';
const UpdateFrmCountry = () => {
    const {code} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [oldCounty] = useSelector(state => state.filter(country=>country.code == code));
    
    const [newCountry,setNewCountry]= useState(oldCounty);
    const [newCities,setNewCities] = useState(oldCounty.cities);



    function hundlerData(obj){
        setNewCountry({...newCountry,...obj,cities:newCities});
    }


    function updateCountry(e){
        let newData = {...newCountry,cities:newCities};
        e.preventDefault();
        setNewCountry(newData);
        dispatch({type:"Update",payload: newData })
        navigate("/Countries")
    }

  return (
    <div className='update-country'>
        <form  >
            <input type="text" placeholder='Image Url'  defaultValue={oldCounty.image} onChange={(e)=>hundlerData({image:e.target.value})} /><br />
            <input type="text" placeholder='Code' readOnly defaultValue={oldCounty.code} onChange={(e)=>hundlerData({code:e.target.value})} /><br />
            <input type="text" placeholder='Name'  defaultValue={oldCounty.name} onChange={(e)=>hundlerData({name:e.target.value})} /><br />
            <input type="text" placeholder='Continent'  defaultValue={oldCounty.continent} onChange={(e)=>hundlerData({continent:e.target.value})} /><br />
            <input type="text" placeholder='Superficie' defaultValue={oldCounty.superficie}  onChange={(e)=>hundlerData({superficie:e.target.value})} /><br />
            <input type="text" placeholder='IndepYear'  defaultValue={oldCounty.indepYear} onChange={(e)=>hundlerData({indepYear:e.target.value})} /><br />
            <input type="text" placeholder='Population'  defaultValue={oldCounty.population} onChange={(e)=>hundlerData({population:e.target.value})} /><br />
            <h2>Cities :</h2>
            {oldCounty.cities.length ? 
                oldCounty.cities.map((city,index)=>(
                    <div className='city' key={index}>
                        <hr />
                        <input type="text" placeholder='Name of city' defaultValue={city.name} onChange={(e) => {
                            const updated = [...newCities];
                            updated[index] = { ...updated[index], name: e.target.value };
                            setNewCities(updated);
                        }} />
                        <input type="text" placeholder='District of city' defaultValue={city.district}   onChange={(e) => {
                            const updated = [...newCities];
                            updated[index] = { ...updated[index], district: e.target.value };
                            setNewCities(updated);
                        }} />
                        <input type="text" placeholder='Propulation of city' defaultValue={city.population}   onChange={(e) => {
                            const updated = [...newCities];
                            updated[index] = { ...updated[index], population: e.target.value };
                            setNewCities(updated);
                        }} />
                        <input type="text" placeholder='Capital of city' defaultValue={city.capital}  onChange={(e) => {
                            const updated = [...newCities];
                            updated[index] = { ...updated[index], capital: e.target.value };
                            setNewCities(updated);
                        }} />
                        <hr />
                    </div>
                ))
                :
                <></>   
            }
            <button onClick={updateCountry}>Update Data</button>
        </form>
    </div>
  )
}

export default UpdateFrmCountry