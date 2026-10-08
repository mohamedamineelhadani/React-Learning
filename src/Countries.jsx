import React from 'react'
import Menu from './Countries/Menu';
import { Route , Routes } from 'react-router-dom';
import Country from './Countries/Country';
import AddFrmCountry from './Countries/AddFrmCountry';
import UpdateFrmCountry from './Countries/UpdateFrmCountry';
import "./Countries.css";
import AddCity from './Countries/AddCity';

const Countries = () => {
  return (
    <div className="countries-app">
        <Menu />
        <Routes>
            <Route path='/Countries' element={<Country />} />
            <Route path='/Add Country' element={<AddFrmCountry />} />
            <Route path='/Update Country/:code' element={<UpdateFrmCountry />} />
            <Route path='/Add City' element={<AddCity />} />
        </Routes>
    </div>
  )
}

export default Countries