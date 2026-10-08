import React, { useState } from "react";
import { ToastContainer , toast } from "react-toastify";


const AjouterStagiaire = ({ajouter}) => {
  const [stagiaire, setStagiaire] = useState({
    nom: "",
    prenom: "",
    ville: "",
    fil: "",
    photo:""
  });

  const [url,setUrl] = useState("");

  function handlerData(){
    for(let key in stagiaire){
      if(stagiaire[key] == ""){
        toast.error(`Please enter ${key} !`);
        return false;
      }        
    }
    toast.success("The stagiaire is add");
    setTimeout(()=>{
      ajouter(stagiaire); 
    },2500)
  }



  return (
    <div className="ajouter-stagiaire">
      <ToastContainer autoClose={2000} />
      <h1>AjouterStagiaire</h1>
      <div className="ajouter-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="group">
            <label htmlFor="nom">Nom :</label>
            <input type="text" id="nom" onChange={(e)=> setStagiaire({...stagiaire,nom:e.target.value})} />
          </div>
          <div className="group">
            <label htmlFor="prenom">Prénom :</label>
            <input type="text" id="prenom" onChange={(e)=> setStagiaire({...stagiaire,prenom:e.target.value})}  />
          </div>
          <div className="group">
            <label htmlFor="fill">Filliere :</label>
            <input type="text" id="fill" onChange={(e)=> setStagiaire({...stagiaire,fil:e.target.value})}  />
          </div>
          <div className="group">
            <label htmlFor="ville">Ville :</label>
            <select id="ville" onChange={(e)=>setStagiaire({...stagiaire,ville:e.target.value})} >
              <option value="Ville" selected style={{display:"none"}}>Ville</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Rabat">Rabat</option>
              <option value="Fas">Fas</option>
            </select>
          </div>
          <div className="group">
            <label htmlFor="photo">Photo :</label>
            <input type="file" id="photo" accept="image/*" onChange={(e)=>{
              setUrl(URL.createObjectURL(e.target.files[0]));
              setStagiaire({...stagiaire,photo:e.target.value});
            }}  />
            <img src={url} alt="" width={200} />
          </div>
          <input type="button" value="Ajouter Stagiaire" onClick={handlerData} />
        </form>
      </div>
    </div>
  );
};

export default AjouterStagiaire;
