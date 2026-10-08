import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ListStagiaires from "./ListStagiaires";
import AjouterStagiaire from "./AjouterStagiaire";
import SupStagiaire from "./SupStagiaire";
import RechercheStagiaire from "./RechercheStagiaire";
import "./style.css";
const AfichageStagiaires = () => {
  const navigate = useNavigate();
  const [stagiaires, setStagiaires] = useState([
    {
      nom: "mohamed amine",
      prenom: "el hadani",
      ville: "casablanca",
      fil: "web full stack",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2nmWoa-66Yo5xylQwIiAxtvMrK2pB2l4CA&s",
    },
    {
      nom: "amine mohamed",
      prenom: "el hadani",
      ville: "casablanca",
      fil: "web full stack",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2nmWoa-66Yo5xylQwIiAxtvMrK2pB2l4CA&s",
    },
  ]);

  function supprimmer(nom) {
    setStagiaires(stagiaires.filter((stg) => stg.nom != nom));
    navigate("/listStagiaires");
  }

  function ajouter(obj) {
    setStagiaires([...stagiaires, obj]);
    navigate("/listStagiaires");
  }

  return (
    <div className="afichage">
      <nav>
        <Link to="/listStagiaires">List Stagiaires</Link>
        <Link to="/ajuterStagiaires">Ajouter Stagiaires</Link>
        <Link to="/supStagiaire">Sup Stagiaires</Link>
        <Link to="/rechercheStagiaire">Recherche Stagiaire</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/listStagiaires" element={ <ListStagiaires stagiaires={stagiaires} supprimmer={supprimmer} /> } />
          <Route path="/ajuterStagiaires" element={<AjouterStagiaire ajouter={ajouter} />} />
          <Route path="/supStagiaire" element={<SupStagiaire supprimmer={supprimmer} />} />
          <Route path="/rechercheStagiaire" element={<RechercheStagiaire stagiaires={stagiaires} />} />
        </Routes>
      </main>
    </div>
  );
};

export default AfichageStagiaires;
