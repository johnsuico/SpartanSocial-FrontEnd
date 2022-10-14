import React from "react";
import { Link } from "react-router-dom";

// Importing CSS
import './landing.css';

// Importing Components
import NavBar from '../NavBar/navBar';

export default function Landing() {
  return (
    <div>

      <NavBar />

      <h1>Temp Landing Page</h1>
      <h3>Navigation</h3>
      <Link to="/login"> Login Page </Link> <br></br>
      <Link to="/createAccount"> Create account page </Link>
    </div>
  )
}