import profile from "./../assets/profile/profile.png";
import "./Player.css";
const Player =({p})=>{
    console.log(p);
    return(
        <div className="player" title={p.name}>
            <div className="profile" style={{background:p.bg}}>
                <img src={profile} alt={p.name} />
                <span className="n">{p.number}</span>
            </div>
            <h2 className="name">
                {p.name}
            </h2>
            <div className="score">
                <h1>Score :</h1>
                <span>{p.score}</span>
            </div>
        </div>
    )
}

export default Player;