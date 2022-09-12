import React, { useState } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";

// Import CSS
import './login.css';

// Import SVGs
import logo from './SpartanSocialLogo.svg';
import rhsGraphic from './rightside-graphic.svg';

export default function Login() {

  // React hooks to store values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setCheck] = useState(false);

  // Takes the value from the email field and sets the "email" hook to its value
  function emailChange(e) {
    setEmail(e.target.value);
  }

  // Same as email
  function passChange(e) {
    setPassword(e.target.value);
  }

  // Same as email
  function onCheck() {
    setCheck(!checked);
    console.log(checked);
  }

  // Handles login by taking the info and putting it in JSON format to send to the API
  function handleLogin(e) {
    // Prevents the page from reloading on form submit
    e.preventDefault();

    // Creating a JSON
    const user = {
      email,
      password
    }

    console.log(user);

    // Add axios link here later
  }

  return(
    // Login Page Container
    <div className="left-side-container">

      {/* Left hand side container */}
      <div className="half-container">

        {/* Left side content container */}
        <div className="left-content-container">

          {/* Logo container */}
          <div className="left-logo">
            <Link to="/"><img src={logo} alt="Spartan Social Logo" /></Link>
          </div>

          {/* Login form container */}
          <form className="account-form" onSubmit={handleLogin}>

            <div className="account-header-container">
              <h1 className="account-header">Log in</h1>
              <p className="account-header-caption">Welcome back! Please enter in your details.</p>
            </div>

            <div className = "account-form-field">
              <label className = "form-label">Email</label>
              <input className = "account-input-field" type ="text" onChange={emailChange} value={email} placeholder="Email"/>
            </div>

            <div className="account-form-field">
              <label className="form-label">Password</label>
              <input className="account-input-field" type="password" onChange={passChange} value={password} placeholder="Password"/>
            </div>

            <div className="login-extra-container">
              <div className="remember-me-container">
                <input type="checkbox" className="remember-me-check" />
                <label htmlFor="" className="remember-me-caption">Remember me</label>
              </div>

              <div className="forgot-pass-container">
                <Link to="/" className="account-link">
                  <p>Forgot password?</p>
                </Link>
              </div>
            </div>

            <button className="submit-btn" type="submit">Log in</button>
        
            <div className="make-account-container">
              <p className="make-account-caption">Don't have an account?</p>
              <Link to="/createAccount" className="account-link">Sign up here</Link>
            </div>

          </form> {/* End of login form*/}

        </div> {/* End of left side login container */}

      </div> {/* End of left hand side container */}

      {/* Right hand side container */}
      <div className="right-login-container half-container">
        <div className="right-content-container">
          <div className="right-content">
            <img src={rhsGraphic} alt="Login graphic" className="rhsGraphic" />
            <div className="right-content-info">
              <h2 className="right-content-header">Welcome to SpartanSocial</h2>
              <p className="right-content-caption">Sign in to start asking questions</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}