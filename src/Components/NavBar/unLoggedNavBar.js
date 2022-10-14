import React from "react";
import { Link } from "react-router-dom";

// Importing CSS
import './navBar.css';

// Import SVGs
import Logo from '../SpartanSocialLogo.svg';

export default function Landing() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" className="nav-logo">
            <img src={Logo} alt="Spartan Social Logo" />
          </Link>
        </div>
        <div className="navbar-quicklinks">
          <Link to="/login" className="link">Log in</Link>
          <Link to="/createAccount" className="CTA-btn">Sign up</Link>
        </div>
      </div>
    </div>
  )
}