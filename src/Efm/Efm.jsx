import React, { useEffect, useState } from 'react'
import Card from './Card';
import Header from './Header';
import "./Efm.css";
const Efm = () => {
    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState("all")
    const [card ,setCard] = useState([]);

    useEffect(()=>{
        fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    const categoreis = ["all",...new Set(products.map(product => product.category))];

    function addToCard(product){
        setCard([...card,product])
    }
    function deleteProduct(product){
        setCard(card.filter(p => p.title != product.title))
    }
  return (
    <div className='efm'>
        <Header />
        <select onChange={(e)=>setCategory(e.currentTarget.value)}>
            {categoreis.map(category=>(
                <option value={category}>{category}</option>
            ))}
        </select>

        <div className="products">
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>category</th>
                        <th>add to panier</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product,index)=>{
                        if(category == "all"){
                            return(
                                <tr key={index}>
                                    <td>{product.title}</td>
                                    <td>{product.price}$</td>
                                    <td>{product.category}</td>
                                    <td><button onClick={()=>{addToCard(product)}}>add</button></td>
                                </tr>
                            )
                        }else if(category == product.category){
                            return(
                                <tr key={index}>
                                    <td>{product.title}</td>
                                    <td>{product.price}$</td>
                                    <td>{product.category}</td>
                                    <td><button onClick={()=>{}}>add</button></td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </div>
        <Card data={card}  deleteProduct={deleteProduct} />
    </div>
  )
}

export default Efm