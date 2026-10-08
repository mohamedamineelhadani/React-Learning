import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header>
        <div className="logo"><h1>Bibliothéque</h1></div>
        <div className="links">
            <Link to="/acceuil">Acceuil</Link>
            <Link to="/details">Details</Link>
        </div>
    </header>
  )
}

export default Header
