import React, { useEffect, useState } from "react";

const Card = ({ data, deleteProduct }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let newTotal = 0;
    data.forEach((product) => {
      newTotal += product.price;
    });
    setTotal(Math.round(newTotal));
  }, [data]);

  return (
    <div className="card">
      {data.map((product, index) => (
        <div key={index}>
          <h3 className="title">{product.title}</h3>
          <h3 className="price">{product.price}$</h3>
          <button className="delete" onClick={() => deleteProduct(product)}>Delete</button>
        </div>
      ))}
      <h1>Totla :{total}$</h1>
    </div>
  );
};

export default Card;
