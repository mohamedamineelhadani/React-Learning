import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AddFrmCountry = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [numCities,setNumCities]= useState(0);
    const [cities,setCities] = useState([]);

    const [cityData ,setCityData] = useState({
        name :"",
        district :"",
        population:"",
        capital:""
    })

    const [countryData ,setCountryData] = useState({
        image:"",
        code:"",
        name:"",
        continent:"",
        superficie:"",
        indepYear:"",
        population:""  
    })



    function hundlerData(obj){
        setCountryData({...countryData,...obj,cities:cities});
    }


    function hundlerCitiesData(){
        const newCitiesData = [...cities,cityData];
        setCities(newCitiesData);
        setCountryData({...countryData,cities:newCitiesData});
        setCityData({name :"",district :"",population:"",capital:""})
    }

    function addCity(){
        const items =[];
        for (let i = 1; i <= numCities; i++) {
            items.push(
                <div className='city'>
                    <input type="text" placeholder='Name of city' onChange={(e)=>setCityData({...cityData,name:e.target.value})} />
                    <input type="text" placeholder='District of city' onChange={(e)=>setCityData({...cityData,district:e.target.value})}/>
                    <input type="text" placeholder='Propulation of city'onChange={(e)=>setCityData({...cityData,population:e.target.value})} />
                    <input type="text" placeholder='Capital of city'onChange={(e)=>setCityData({...cityData,capital:e.target.value})} />
                    <button onClick={(e)=>{
                        e.preventDefault();
                        e.target.style.display="none";
                        hundlerCitiesData();
                    }}>Add</button>
                </div>
            )
        }
        return items;
    }


    function addCountry(e){
        e.preventDefault();
        dispatch({type:"Add",payload:countryData});
        navigate("/Countries");
    }


  return (
    <div className="add-country">
        <form >
            <input type="text" placeholder='Image Url'  onChange={(e)=>hundlerData({image:e.target.value})} /><br />
            <input type="text" placeholder='Code' onChange={(e)=>hundlerData({code:e.target.value})} /><br />
            <input type="text" placeholder='Name'  onChange={(e)=>hundlerData({name:e.target.value})} /><br />
            <input type="text" placeholder='Continent'  onChange={(e)=>hundlerData({continent:e.target.value})} /><br />
            <input type="text" placeholder='Superficie'  onChange={(e)=>hundlerData({superficie:e.target.value})} /><br />
            <input type="text" placeholder='IndepYear'  onChange={(e)=>hundlerData({indepYear:e.target.value})} /><br />
            <input type="text" placeholder='Population'  onChange={(e)=>hundlerData({population:e.target.value})} /><br />
            <button onClick={(e)=>{
                e.preventDefault();
                setNumCities(numCities + 1);
            }}>Add city</button>


            {addCity()}



            <button onClick={addCountry}>Add Data</button>
        </form>
    </div>
  )
}

export default AddFrmCountry