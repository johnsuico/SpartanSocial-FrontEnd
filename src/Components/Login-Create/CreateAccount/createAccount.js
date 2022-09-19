import React, { useState } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";

// Import CSS
import '../account.css';
import './createAccount.css';

// Import SVGs
import logo from '../SpartanSocialLogo.svg';
import RHS from './RHS.svg';

export default function Login() {

  // React hooks to store values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // Takes the value from the email field and sets the "email" hook to its value
  function emailChange(e) {
    setEmail(e.target.value);
  }

  // Same as email
  function passChange(e) {
    setPassword(e.target.value);
  }

  function confirmChange(e) {
    setConfirmPass(e.target.value);
  }

  // Handles login by taking the info and putting it in JSON format to send to the API
  function handleLogin(e) {
    // Prevents the page from reloading on form submit
    e.preventDefault();

    // Creating a JSON
    const user = {
      email,
      password,
      confirmPass
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
              <h1 className="account-header">Create an account</h1>
              <p className="account-header-caption">Welcome! Let's get started with creating your account.</p>
            </div>

            <div className = "account-form-field">
              <label className = "form-label">Email</label>
              <input className = "account-input-field" type ="text" onChange={emailChange} value={email} placeholder="Email"/>
            </div>

            <div className="account-form-field">
              <label className="form-label">Password</label>
              <input className="account-input-field" type="password" onChange={passChange} value={password} placeholder="Password"/>
            </div>

            <div className="account-form-field last-account-form-field">
              <label className="form-label">Confirm Password</label>
              <input className={confirmPass === password ? "account-input-field" : "account-input-field confirm-pass-wrong"} type="password" onChange={confirmChange} value={confirmPass} placeholder="Confirm password"/>
              {confirmPass != password &&
                <p className="password-no-match">Passwords do not match</p>
              }
            </div>

            <button className="submit-btn" type="submit">Create account</button>
        
            <div className="account-extra-container">
              <p className="account-extra-caption">Already have an account?</p>
              <Link to="/login" className="account-link">Log in here</Link>
            </div>

          </form> {/* End of login form*/}

        </div> {/* End of left side login container */}

      </div> {/* End of left hand side container */}

      {/* Right hand side container */}
      <div className="right-login-container half-container">

        <div className="right-content-container">

          <div className="right-content">
            <img src={RHS} alt="" />
          </div>

        </div>

      </div>

    </div>
  )
}