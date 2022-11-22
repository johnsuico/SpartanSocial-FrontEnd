import React from "react";
import { Link } from "react-router-dom";

// Importing CSS
import './navbar.css';

// Import SVGs
import Logo from '../SpartanSocialLogo.svg';

export default function Landing({active}) {

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="nav-section">
          {/* Logo is clickable to go back to the landing page. */}
          <Link to="/" className="nav-logo">
            <img src={Logo} alt="Spartan Social Logo" />
          </Link>
        </div>
        <div className="nav-section">
          {/* Navigation links that changes visual when selected. */}
          <Link to="/" className={
            active === 'forums' ?
            `nav-link link active` :
            `nav-link link`
          }>Forums</Link>
          <Link to="/events" className={
            active === 'events' ?
            `nav-link link active` :
            `nav-link link`
          }>Events</Link>
        </div>
        <div className="nav-section">
          <Link to="/login" className="nav-link link">Log in</Link>
          <Link to="/createAccount" className="CTA-btn">Sign up</Link>
        </div>
      </div>
    </div>
  )
}