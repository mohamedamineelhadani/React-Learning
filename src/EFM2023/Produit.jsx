import React from 'react'

const Produit = ({produit}) => {
  return (
    <div className='produit'>
        <img src={produit.thumbnail} alt={produit.title} />
        <h1>{produit.title}</h1>
        <p>{produit.price}</p>
        <button>ajouter au paniet</button>
    </div>
  )
}

export default Produit