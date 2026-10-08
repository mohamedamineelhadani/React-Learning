import { createStore } from "@reduxjs/toolkit";
import CountriesReducer from "./CountriesReducer";

const CountriesStore = createStore(CountriesReducer);
export default CountriesStore;