import React, { useEffect, useState } from "react";
import AjouterLiver from "./AjouterLiver";
import ProduitAffichage from "./ProduitAffichage";
import axios from "axios";
import "./style.css"



const Efm = () => {
    // 1
    const produits =[
        {id:1,title:"pc portable",price:"200 dh",thumbnail:""},
        {id:1,title:"pc portable",price:"200 dh",thumbnail:""},
        {id:1,title:"pc portable",price:"200 dh",thumbnail:""},
        {id:1,title:"pc portable",price:"200 dh",thumbnail:""},
        {id:1,title:"pc portable",price:"200 dh",thumbnail:""},
        {id:1,title:"pc portable",price:"200 dh",thumbnail:""}
    ];




    // exercice 3
       // 1
    const [dataApi,setDataApi] = useState([]);

    useEffect(()=>{
        axios.get("https://disease.sh/v3/covid-19/countries")
        .then(res => setDataApi(res.data))
// ////////////////////////
        // fetch("https://disease.sh/v3/covid-19/countries")
        // .then(res => res.json())
        // .then(data => setDataApi(data))
    },[])

 





  const [livers, setLivers] = useState([]);

  function ajouterLiver(liver){
    for(let x in liver){
        if(liver[x] == "" || liver[x] == null){
            alert(`please insert ${x}`)
            return ;
        }
    }
    if(liver.prix <=200){
        setLivers([...livers,liver])
    }else{
        alert("3amar b 9al mn 200 ola 200")
    }
  }

  return (
    <div className="emf">
        <AjouterLiver ajouter={ajouterLiver} />
        <div className="list">
            {livers.map(liver=>(
                <div className="item" key={liver.num}>
                    <p>@ num : {liver.num}</p>
                    <p>@ titre : {liver.titre}</p>
                    <p>@ date : {liver.date}</p>
                    <p>@ genre : {liver.genre}</p>
                    <p>@ prix : {liver.prix}</p>
                </div>
            ))}
        </div>


      <ProduitAffichage data={produits} />


      {/* payes */}

      <div className="payes">
        {dataApi.map(pay=>(
            <p>@ {pay.country} ---------- {pay.cases}</p>
        ))}
      </div>
    </div>
  );
};

export default Efm;
