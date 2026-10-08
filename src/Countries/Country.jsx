import React from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Country = () => {
    const countries = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(!countries.length){
        return <h1 className='loader'>There's no Data</h1>
    }

  return (
    <div className="countries">
      {countries.map(country =>(
        <div className="country" key={country.code}>

          <button onClick={()=>dispatch({type:"Delete",payload:country.code})}>Delete</button>
          <button onClick={()=>navigate(`/Update Country/${country.code}`)} >Update</button>
            

          <div className="image"><img src={country.image} alt={country.name} /></div>
          <h2>Code : <span>{country.code}</span></h2>
          <h2>Name  : <span>{country.name}</span></h2>
          <h2>Continent : <span>{country.continent}</span></h2>
          <h2>Superficie : <span>{country.superficie}</span></h2>
          <h2>IndepYear : <span>{country.indepYear}</span></h2>
          <h2>Population : <span>{country.population}</span></h2>
          <h2>Cities :</h2>
          <div className="cities">
            {country.cities ?
                country.cities.map((city , index) =>(
                    <div className="city" key={index}>
                        <hr />
                        <h3>Name : <span>{city.name}</span></h3>
                        <h3>District : <span>{city.district}</span></h3>
                        <h3>Propulation : <span>{city.population}</span></h3>
                        <h3>Capital : <span>{city.capital}</span></h3>
                        <hr />
                    </div>
                )) 
            : <></>
            }
          </div>
        </div>
      ))}

    </div>
  )
}

export default Country