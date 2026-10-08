import React from 'react'

const intitState = [];


const CountriesReducer = (state=intitState,action) => {
    switch(action.type){
        case "Add" :
            return [...state,action.payload];
        case "Delete" :
            return state.filter(country=>country.code != action.payload);
        case "Update":
            return [...state.filter(country=>country.code != action.payload.code), action.payload];
        case "AddCity":
            return state.map(country => country.code != action.code ? country : {...country,cities:[...country.cities,action.payload]} );
        case "DeleteCity":
            return state.map(country => country.code != action.code ? country : {...country,cities:country.cities.filter(city => city.name =! action.name)});
        default :
            return state ;
    }
}

export default CountriesReducer