import { createSlice } from "@reduxjs/toolkit";

const initialState =  [];

fetch("https://fakestoreapi.com/products").then(res => res.json()).then(data => initialState = data);



const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
      console.log(state)
    },

    deleteProduct: (state, action) => {        
      state = state.filter((product) => product.id != action.payload);
    },

    updateProduct: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addProduct, deleteProduct, updateProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
