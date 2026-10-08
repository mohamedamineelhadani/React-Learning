import React, { useState } from 'react'

const RechercheStagiaire = ({stagiaires}) => {
    const [nom,setNom] = useState("");
  return (
    <div className='recherche-stagiaire'>
        <h1>Recherche Stagiaire :</h1>
        <div className="recherche">
            <input type="search" list='options' onChange={(e)=>setNom(e.target.value)} />
            <datalist id='options'>
                {stagiaires.map((stagiaire)=>(
                    <option value={stagiaire.nom}>{stagiaire.nom}</option>
                ))}
            </datalist>
        </div>
        <div className="stagiaires">
            <h1>List Stagiaires :</h1>
            {stagiaires.map((stagiaire,index)=> {
                if(stagiaire.nom.toLowerCase().includes(nom.toLowerCase()) && nom != ""){
                    return(
                        <div className="stagiaire" key={index}>
                            <div className="image">
                                <img src={stagiaire.photo} alt={stagiaire.nom} />
                            </div>
                            <div className="info">
                                <h3>Nom et Prenom :<span>{stagiaire.nom} {stagiaire.prenom}</span></h3>
                                <h3>Ville :<span>{stagiaire.ville}</span></h3>
                                <h3>Fill :<span>{stagiaire.fil}</span></h3>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    </div>
  )
}

export default RechercheStagiaire