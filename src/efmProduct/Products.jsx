import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);




  const [prix,setPrix] = useState(0);
  const [jour,setJour] = useState(0);
  const [total,setTotal] = useState(prix * jour);

  useEffect(()=>{
    setTotal(prix * jour)
  },[jour,prix]);





  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div style={{
        width:"100%",
        marginTop:"70px",
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",
        gap:"10px",
        padding:"0 20px"        
    }}>


      <select onChange={(e)=>setPrix(Number(e.currentTarget.value))}>
        <option value="100">e</option>
        <option value="500">a</option>
        <option value="504">b</option>
      </select>
      <input type="number" onChange={(e)=>setJour(Number(e.currentTarget.value))} />
      <h1>{prix * jour}</h1>
      <h1>{total}</h1>


      {products.map((product) => (
        <div key={product.id} style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
            padding:"10px",
            background:"white",
            border:"solid 2px black",
            borderRadius:"10px"
        }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
                objectFit:"cover",
                width:"100%",
                height:"300px"
            }}
          />
            <h5 className="card-title text-truncate" title={product.title}>
              {product.title}
            </h5>
            <span className="price fw-bold text-success fs-4">
              {product.price}
            </span>
            <button style={{background:"blue",color:"white",border:"none",padding:"10px" ,borderRadius:"10px"}}>
              Ajouter au panier
            </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
