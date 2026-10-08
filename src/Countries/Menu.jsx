import React from 'react'
import {Link} from "react-router-dom"
const Menu = () => {
  return (
    <header>
        <div className="logo">Countries Management System</div>
        <div className="links">
            <Link to="/Countries">Countries</Link>
            <Link to="/Add Country">Add Country</Link>
            <Link to="/Add City">Add City</Link>
        </div>
    </header>
  )
}

export default Menu