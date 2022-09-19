import React, { useState } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";

// Import CSS
import '../account.css';
import './accountInfo.css';

// Import SVGs
import logo from '../SpartanSocialLogo.svg';
import accountInfo from './accountInfo.svg';

export default function Login() {

  // React hooks to store values
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [userName, setUserName] = useState('');
  const [major, setMajor] = useState('');

  // React hooks for checkboxs
  const [useDisplay, setDisplay] = useState(false);
  const [isStudent, setStudent] = useState(false);

  // Takes the value from the email field and sets the "email" hook to its value
  function firstNameChange(e) {
    setFirst(e.target.value);
  }

  function lastNameChange(e) {
    setLast(e.target.value);
  }

  function userNameChange(e) {
    setUserName(e.target.value);
  }

  function majorChange(e) {
    setMajor(e.target.value);
  }

  function onUseDisplay() {
    setDisplay(!useDisplay);
  }

  function onStudent() {
    setStudent(!isStudent);
  }

  // Handles login by taking the info and putting it in JSON format to send to the API
  function handleSubmit(e) {
    // Prevents the page from reloading on form submit
    e.preventDefault();

    // Creating a JSON
    const user = {
      firstName,
      lastName,
      userName,
      major,
      useDisplay,
      isStudent
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
          <form className="account-form account-info-form" onSubmit={handleSubmit}>

            <div className="account-header-container">
              <h1 className="account-header">Account Information</h1>
              <p className="account-header-caption">Let's get to know you.</p>
            </div>

            <div className = "account-form-field">
              <label className = "form-label">First Name</label>
              <input className = "account-input-field" type ="text" onChange={firstNameChange} value={firstName} placeholder="First Name"/>
            </div>

            <div className="account-form-field">
              <label className="form-label">Last Name</label>
              <input className="account-input-field" type="test" onChange={lastNameChange} value={lastName} placeholder="Last Name"/>
            </div>

            <div className="account-form-field">
              <label className="form-label">Display Name / Username</label>
              <input className="account-input-field" type="test" onChange={userNameChange} value={userName} placeholder="Username"/>
            </div>

            <div className="account-check-container">
              <input type="checkbox" className="account-check" onChange={onUseDisplay}/>
              <label className="account-check-caption account-info-check">Use display name</label>
            </div>

            <div className="account-form-field">
              <label className="form-label">Major</label>
              <input className="account-input-field" type="test" onChange={majorChange} value={major} placeholder="College Major"/>
            </div>

            <div className="account-check-container">
              <input type="checkbox" className="account-check" onChange={onStudent}/>
              <label className="account-check-caption account-info-check">Current Student</label>
            </div>

            <button className="submit-btn" type="submit">Create account</button>

          </form> {/* End of login form*/}

        </div> {/* End of left side login container */}

      </div> {/* End of left hand side container */}

      {/* Right hand side container */}
      <div className="right-login-container half-container">

        <div className="right-content-container">

          <div className="right-content">
            <img src={accountInfo} alt="" />
          </div>

        </div>

      </div>

    </div>
  )
}