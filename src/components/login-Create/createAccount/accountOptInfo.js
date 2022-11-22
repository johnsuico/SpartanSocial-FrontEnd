import React, { useState } from "react";
import Axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";

// Import CSS
import '../account.css';
import './accountOptInfo.css';

// Import SVGs
import logo from '../../SpartanSocialLogo.svg';
import optInfo from './optInfo.svg';

export default function Login() {

  // React hooks to store values
  const [gradDate, setGradDate] = useState('');
  const [birthDate, setBirth] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();

  // Takes the value from the email field and sets the "email" hook to its value
  function gradDateChange(e) {
    if (e.target.value.length < 5) {
      setGradDate(e.target.value);
    }
  }

  function birthChange(e) {
    setBirth(e.target.value);
  }

  function pronounChange(e) {
    setPronouns(e.target.value);
  }

  function genderChange(e) {
    setGender(e.target.value);
  }

  function bioChange(e) {
    setBio(e.target.value);
  }

  // Handles login by taking the info and putting it in JSON format to send to the API
  function handleSubmit(e) {
    // Prevents the page from reloading on form submit
    e.preventDefault();

    // Creating a JSON
    const updateAccountInfo = {
      gradDate,
      birthDate,
      pronouns,
      gender,
      bio
    }

    // API POST request to send the data to the database to update the user's data.
    Axios.post(`https://spartansocial-api.herokuapp.com/users/${id}/register/cp3`, updateAccountInfo)
    .then(res => {
      navigate(`/`);
    })
    .catch (err => {
      console.log(err);
    })

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
          <form className="account-form" onSubmit={handleSubmit}>

            <div className="account-header-container">
              <h1 className="account-header">Optional Information</h1>
              <p className="account-header-caption">You can leave the fields blank if you want to.</p>
            </div>

            <div className="optInfo-container">

              <div className = "account-form-field">
                <label className = "form-label">Graduation Date</label>
                <input className = "opt-input-field" type ="number" min="1900" max="9999" onChange={gradDateChange} value={gradDate} placeholder="Ex. 2022"/>
              </div>

              <div className = "account-form-field">
                <label className = "form-label">Birthday</label>
                <input className = {birthDate ? "opt-input-field birth-field-done" : "opt-input-field"} type ="date" onChange={birthChange} value={birthDate} placeholder="MM/DD/YYYY"/>
              </div>

            </div>

            <div className="optInfo-container">

              <div className = "account-form-field">
                <label className = "form-label">Pronouns</label>
                <input className = "opt-input-field" type ="text" onChange={pronounChange} value={pronouns} placeholder="Ex. they/them"/>
              </div>

              <div className = "account-form-field">
                <label className = "form-label">Gender</label>
                <input className = "opt-input-field" type ="text" onChange={genderChange} value={gender} placeholder="Ex. Male"/>
              </div>

            </div>

            <div className="account-form-field">
              <label className="form-label">Short bio</label>
              <textarea id="" cols="30" rows="10" className="opt-input-field bio" onChange={bioChange} value={bio} placeholder="Tell us about yourself in 150 characters or less." maxlength="150"></textarea>
            </div>

            <button className="submit-btn" type="submit">Create account</button>

          </form> {/* End of login form*/}

        </div> {/* End of left side login container */}

      </div> {/* End of left hand side container */}

      {/* Right hand side container */}
      <div className="right-login-container half-container">

        <div className="right-content-container">

          <div className="right-content">
            <img src={optInfo} alt="" />
          </div>

        </div>

      </div>

    </div>
  )
}