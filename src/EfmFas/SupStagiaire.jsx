import React, { useState } from 'react'

const SupStagiaire = ({supprimmer}) => {
    const [nom,setNom] = useState("");
  return (
    <div className='sub-stagiaire'>
        <input type="text" onChange={(e)=>setNom(e.target.value)} />
        <button onClick={()=>supprimmer(nom)}>Supprimmer Stagiaire</button>
    </div>
  )
}

export default SupStagiaire