// src/Navbar.js
import React from 'react';
import Logo from '../images/Daco_6006382.png'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <img src={Logo} alt="Logo" className="logo-image" ></img>
            <div className="navbar-title">REACT NEWS APP</div>

        </nav>
    );
};

export default Navbar;
