import React,{useState} from "react";

const AjouterLiver = ({ajouter}) => {
  const [liver, setLiver] = useState({
    num: "",
    titre: "",
    date: "",
    genre: "",
    prix: 0,
  });

  function handelChange(e){
    const input = e.target;
    setLiver({...liver,[input.name]:input.value})
  }

  function Reset(e){
    e.preventDefault();
    const reset = {
    num: "",
    titre: "",
    date: "",
    genre: "",
    prix: 0,
   };
   setLiver(reset);
  }

  return (
    <form onSubmit={(e)=>{
        e.preventDefault();
        ajouter(liver)
    }}>
      <div className="group">
        <label htmlFor="">Num </label>
        <input type="text" value={liver.num} required name="num" onChange={handelChange} />
      </div>
      <div className="group">
        <label htmlFor="">Titre :</label>
        <input type="text" required value={liver.titre} name="titre" onChange={handelChange} />
      </div>
      <div className="group">
        <label htmlFor="">Date diEdition :</label>
        <input type="date" required value={liver.date} name="date" onChange={handelChange} />
      </div>
      <div className="group">
        <label htmlFor="select">Genre Literire :</label>
        <select id="select" required value={liver.genre} name="genre" onChange={handelChange}>
          <option value="comidia">Comidia</option>
          <option value="action">Action</option>
        </select>
      </div>
      <div className="group">
        <label htmlFor="prix">Prix :</label>
        <input type="number" id="prix" required value={liver.prix}  name="prix" onChange={handelChange}/>
      </div>
      <div className="group">
        <button>Ajouter</button>
        <button onClick={Reset}>Reset</button>
      </div>
    </form>
  );
};

export default AjouterLiver;
