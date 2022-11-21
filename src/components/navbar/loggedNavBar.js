import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';

// Importing CSS
import './navbar.css';

// Import SVGs
import Logo from '../SpartanSocialLogo.svg';

export default function Landing({userID, active}) {

  const [user, setUser] = useState('');

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate(0);
  }

  useEffect(() => {
    Axios.get(`https://spartansocial-api.herokuapp.com/users/${userID}`)
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="nav-section">
          <Link to="/" className="nav-logo">
            <img src={Logo} alt="Spartan Social Logo" className="nav-logo-svg"/>
          </Link>
        </div>
        <div className="nav-section">
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
          <Link to={"/profilepage/"+user._id} className={
            active === 'profile' ?
            `nav-link link active` :
            `nav-link link`
          }>Profile</Link>
        </div>
        <div className="nav-section">
          <p className="user-welcome">Welcome, {user.firstName} {user.lastName}</p>
          <Link to="/" className="CTA-btn" onClick={logout}>Log out</Link>
        </div>
      </div>
    </div>
  )
}