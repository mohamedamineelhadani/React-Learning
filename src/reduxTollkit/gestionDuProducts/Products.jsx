import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "./ProductsSlice";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.list);

  const [name, setName] = useState("");

  const handleAdd = () => {
    dispatch(
      addProduct({
        id: Date.now(),
        name: name,
      })
    );
    setName("");
  };

  return (
    <div>
      <h2>Products</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => dispatch(deleteProduct(product.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
