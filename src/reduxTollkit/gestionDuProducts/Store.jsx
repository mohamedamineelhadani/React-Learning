import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice";

export const Store = configureStore({
  reducer: {
    list: productsReducer,
  },
});
