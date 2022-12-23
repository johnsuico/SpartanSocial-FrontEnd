import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';

// Importing CSS
import './navbar.css';

// Import SVGs
import Logo from '../SpartanSocialLogo.svg';

export default function Landing(props) {

  // React hooks to store date.
  const [user, setUser] = useState('');

  // useNavigate function renamed to navigate.
  // Used to redirect users.
  const navigate = useNavigate();

  // Logout function, clears the user's data from the localStorage.
  function logout() {
    localStorage.clear();
    navigate(0);
  }

  useEffect(() => {
    // API GET request to grab the user's data from the database.
    Axios.get(process.env.REACT_APP_API_BASE_URL+`users/${props.userID}`)
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [user])

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
            props.active === 'forums' ?
            `nav-link link active` :
            `nav-link link`
          }>Forums</Link>
          <Link to="/events" className={
            props.active === 'events' ?
            `nav-link link active` :
            `nav-link link`
          }>Events</Link>
          {/* Added profile page link to the user's profile page. */}
          {/* Only visable when logged in. */}
          <Link to={"/profilepage/"+user._id} className={
            props.active === 'profile' ?
            `nav-link link active` :
            `nav-link link`
          }>Profile</Link>
        </div>
        <div className="nav-section">
          <p className="user-welcome">Welcome, {props.firstName} {props.lastName}</p>
          <Link to="/" className="nav-link link" onClick={logout}>Log out</Link>
        </div>
      </div>
    </div>
  )
}