import React from 'react'
const ListStagiaires = ({stagiaires,supprimmer}) => {

  return (
    <div className='list-stagiaires'>
        <h1>List Stagiaires :</h1>
        <div className="stagiaires">
            {stagiaires.map((stagiaire , index)=>(
                <div className="stagiaire" key={index}>
                    <div className="image">
                        <img src={stagiaire.photo} alt={stagiaire.nom} />
                    </div>
                    <div className="info">
                        <h3>- Nom et Prenom :<br /><span>{stagiaire.nom} {stagiaire.prenom}</span></h3>
                        <h3>- Ville :<br /><span>{stagiaire.ville.toUpperCase()}</span></h3>
                        <h3>- Fill :<br /><span>{stagiaire.fil}</span></h3>
                    </div>
                    <div className="buttons">
                        <button onClick={()=>supprimmer(stagiaire.nom)}>Supprimmer</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
export default ListStagiaires