import React from 'react'
import Produit from './Produit'

const ProduitAffichage = ({data}) => {
  return (
    <div className="produits">
        {data.map(produit=>(
            <Produit produit={produit} />
        ))}
    </div>
  )
}

export default ProduitAffichage