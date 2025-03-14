import React, { useState } from 'react';
import './Navbar.css';

import logo from '../Images/logo.jpg';

const Navbar = () => {
    
    const [menu,setMenu] = useState("shop");

  return (
    <div className='navbar'>
      {/* Logo Section */}
      <div className="nav-logo">
        <img src={logo} alt="SmartHomeCare Logo" />
        <p>SmartHomeCare</p>
      </div>

      {/* Navbar Menu */}
      <ul className='nav-menu'>
         <li onClick={()=>{setMenu("home")}}>Home{menu==="home"?<hr/>:<></>}</li>
         <li onClick={()=>{setMenu("services")}}>Services{menu==="services"?<hr/>:<></>}</li>
         <li onClick={()=>{setMenu("about")}}>About Us{menu==="about"?<hr/>:<></>}</li>
         <li onClick={()=>{setMenu("contact")}}>Contact Us{menu==="contact"?<hr/>:<></>}</li>
      </ul>

      {/* Phone Number */}
      <div className="nav-contact">
        <p>📞 +94 77 123 4567</p>
      </div>

      {/* Buttons Section */}
      <div className='nav-buttons'>
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar;

