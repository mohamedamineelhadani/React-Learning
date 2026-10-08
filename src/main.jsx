import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import  {BrowserRouter} from "react-router-dom";
import "./index.css";





// import AfichageStagiaires from "./EfmFas/AfichageStagiaires";
import POS from "./POS/POS";
import Hocks from "./Hocks/Hocks";
import Efm from "./EFM2023/efm";
import Test from "./Test.jsx";
import App from "./App.jsx";
// import { Provider } from "react-redux";



// import Countries from "./countries.jsx";
// import CountriesStore from "./Countries/CountriesStore.js";


// import store from "./Counter/Store.jsx";
// import Counter from "./Counter/Counter.jsx";
// import { Provider } from 'react-redux';
// import { Store } from "./reduxTollkit/gestionDuProducts/Store";
// import Products from "./reduxTollkit/gestionDuProducts/Products";
// import { store } from './reduxTollkit/Store';
// import ReduxTollkit from './reduxTollkit/ReduxToolkit';


// import Posts from "./Posts/Posts.jsx";
// import PostsStore from "./Posts/PostsStore.jsx";



createRoot(document.body).render(
  <BrowserRouter>
    <StrictMode>
      {/* <Provider store={Store}> */}
      {/* <AfichageStagiaires /> */}
      {/* <POS /> */}
      {/* <Test /> */}

      {/* <ReduxTollkit /> */}

        {/* <Products /> */}
        <App /> 
        {/* <Counter /> */}
        {/* <Countries /> */}
        {/* <Posts /> */}
        {/* <Hocks /> */}
      {/* </Provider> */}
      {/* <Efm /> */}
    </StrictMode>
  </BrowserRouter>
);






