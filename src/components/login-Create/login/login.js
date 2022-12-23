import React, { useState } from "react";
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

// Import CSS
import './login.css';
import '../account.css';

// Import SVGs
import logo from '../../SpartanSocialLogo.svg';
import rhsGraphic from './rightside-graphic.svg';

export default function Login() {

  // React hooks to store values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setCheck] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

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

    // API POST request to the API to create a new user and store their data in the database.
    Axios.post(process.env.REACT_APP_API_BASE_URL+`users/auth`, user)
    .then(res => {
      // If successful, take the response data and store in the browser's local storage so that we can check if the user is logged in or not.
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirect to the landing page once logged in.
      navigate('/');
    })
    .catch(err => {
      // If there are any errors, print them on the console.
      console.log(err.response.status);
      setError(true);
    })
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

            {/* Form title and caption. */}
            <div className="account-header-container">
              <h1 className="account-header">Log in</h1>
              <p className="account-header-caption">Welcome back! Please enter in your details.</p>
              {error ?
                <div className="errorLogin">
                  <p className="errorContent">Your username or password is incorrect.</p>
                </div>
              :
                <div className="errorLogin"></div>
              }
            </div>

            {/* Login form email field. */}
            <div className = "account-form-field">
              <label className = "form-label">Email</label>
              <input className = "account-input-field" type ="text" onChange={emailChange} value={email} placeholder="Email"/>
            </div>

            {/* Login form password field. */}
            <div className="account-form-field">
              <label className="form-label">Password</label>
              <input className="account-input-field" type="password" onChange={passChange} value={password} placeholder="Password"/>
            </div>

            <div className="login-extra-container">
              {/* Checkbox asking the user to remember them or not. */}
              <div className="account-check-container">
                <input type="checkbox" className="account-check" value={checked} onChange={onCheck}/>
                <label className="remember-me-caption">Remember me</label>
              </div>

              {/* DEAD LINK, just there for the design. */}
              {/* Forgot password functionality is not implemented. */}
              <div className="forgot-pass-container">
                <Link to="/" className="account-link">
                  <p>Forgot password?</p>
                </Link>
              </div>
            </div>

            {/* Forum submit button. */}
            <button className="submit-btn" type="submit">Log in</button>
        
            {/* Footer content with extra information for the user. */}
            <div className="account-extra-container">
              <p className="account-extra-caption">Don't have an account?</p>
              <Link to="/createAccount" className="account-link">Sign up here</Link>
            </div>

          </form> {/* End of login form*/}

        </div> {/* End of left side login container */}

      </div> {/* End of left hand side container */}

      {/* Right hand side container */}
      <div className="right-login-container half-container">

        <div className="right-content-container">

          <div className="right-content">

            {/* Login graphic on the right hand side of the screen. */}
            <img src={rhsGraphic} alt="Login graphic" className="rhsGraphic" />

            {/* Information shown to the user while logging in. */}
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