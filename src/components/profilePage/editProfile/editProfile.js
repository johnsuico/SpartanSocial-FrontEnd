import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Axios from 'axios';

// Import CSS
import './editProfile.css';

// Import Components
import Navbar from '../../navbar/navbar';

export default function editProfile() {
  const navigate = useNavigate();

  const {userID} = useParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [useDisplayName, setUseDisplay] = useState(false);
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [gradDate, setGradDate] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    Axios.get(`https://spartansocial-api.herokuapp.com/users/${userID}`)
      .then (res => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUserName(res.data.userName);
        setUseDisplay(res.data.useDisplayName);
        setEmail(res.data.email);
        setMajor(res.data.major);
        setIsStudent(res.data.isStudent);
        setPronouns(res.data.pronouns);
        setGender(res.data.gender);
        setBio(res.data.bio);
      })
      .catch (err => {
        console.log(err);
      })

  }, [])

  function handleChange(e) {
    const {name, value} = e.target;

    switch(name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "useDisplay":
        setUseDisplay(!useDisplayName);
        break;
      case "email":
        setEmail(value);
        break;
      case "major":
        setMajor(value);
        break;
      case "isStudent":
        setIsStudent(!isStudent);
        break;
      case "gradDate":
        setGradDate(value);
        break;
      case "birthDate":
        setBirthDate(value);
        break;
      case "pronouns":
        setPronouns(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "bio":
        setBio(value);
        break;
      default:
        // No default
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    const updateAccountInfoOne = {
        firstName,
        lastName,
        userName,
        useDisplayName,
        major,
        isStudent
    }
    
    const updateAccountInfoTwo = {
      gradDate,
      birthDate,
      pronouns,
      gender,
      bio
    }

    Axios.post(`https://spartansocial-api.herokuapp.com/users/${userID}/register/cp2`, updateAccountInfoOne)
      .then (res => console.log(res.data))
      .catch (err => console.log(err));

    Axios.post(`https://spartansocial-api.herokuapp.com/users/${userID}/register/cp3`, updateAccountInfoTwo)
      .then (res => console.log(res.data))
      .catch (err => console.log(err));

    navigate(`/profilepage/${userID}`);
  }

  return (
    <div className="editProfile-page">
      <Navbar active="profile" />
      <div className="editProfile-container">
        <form className="editProfile-form" onSubmit={onSubmit}>

          <div className="editProfile-header-container">
            <h1 className="editProfile-header-title">Edit your profile</h1>
            <p className="editProfile-header-caption">All of this is completely optional.</p>
          </div>

          <div className="editProfile-form-field">
            <label className="editProfile-form-label">First Name:</label>
            <input type="text" className="editProfile-form-input" value={firstName} onChange={handleChange} name="firstName"/>
          </div>

          <div className="editProfile-form-field">
            <label className="editProfile-form-label">Last Name:</label>
            <input type="text" className="editProfile-form-input" value={lastName} onChange={handleChange} name="lastName"/>
          </div>

          <div className="editProfile-form-field">
            <label className="editProfile-form-label">Email:</label>
            <input type="text" className="editProfile-form-input" value={email} onChange={handleChange} name="email"/>
          </div>

          <div className="editProfile-form-field">
            <label className="editProfile-form-label">Display Name:</label>
            <input type="text" className="editProfile-form-input" value={userName} onChange={handleChange} name="userName"/>
            <div className="editProfile-checkbox-container">
              <label className="editProfile-checkbox-label">Use username?</label>
              {useDisplayName ?
                <input type="checkbox" className="editProfile-checkbox" value={useDisplayName || false} onChange={handleChange} name="useDisplay" checked={true}/>
              :
                <input type="checkbox" className="editProfile-checkbox" value={useDisplayName || false} onChange={handleChange} name="useDisplay"/>
              }
            </div>
          </div>

          <div className="editProfile-form-field">
            <label className="editProfile-form-label">Major:</label>
            <input type="text" className="editProfile-form-input" value={major} onChange={handleChange} name="major"/>
            <div className="editProfile-checkbox-container">
              <label className="editProfile-checkbox-label">Current student?</label>
              {isStudent ?
                <input type="checkbox" className="editProfile-checkbox" value={isStudent || false} onChange={handleChange} name="isStudent" checked={true}/>
              
              :
                <input type="checkbox" className="editProfile-checkbox" value={isStudent} onChange={handleChange} name="isStudent"/>
              }
            </div>
          </div>

          <div className="editProfile-form-field">
            <label className="editProfile-form-label">Graduation Date:</label>
            <input type="number" className="editProfile-form-input" min="1900" max="9999" value={gradDate} onChange={handleChange} name="gradDate"/>
          </div>

          <div className="editProfile-form-field">
            <label className="editProfile-form-label">Birthday:</label>
            <input type="date" className="editProfile-form-input" onChange={handleChange} name="birthDate"/>
          </div>

          <div className="editProfile-form-field">
            <label className="editProfile-form-label">Pronouns:</label>
            <input type="text" className="editProfile-form-input" value={pronouns} onChange={handleChange} name="pronouns"/>
          </div>

          <div className="editProfile-form-field">
            <label className="editProfile-form-label">Gender</label>
            <input type="text" className="editProfile-form-input" value={gender} onChange={handleChange}/>
          </div>

          <div className="editProfile-form-field">
            <label className="editProfile-form-label">Bio:</label>
            <textarea id="" cols="30" rows="10" className="editProfile-form-input-textarea" maxLength="150" value={bio} onChange={handleChange} name="bio"></textarea>
          </div>

          <div className="editProfile-form-footer">
            <button className="editProfile-submit-btn" type="submit">Submit Changes</button>
          </div>

        </form>
      </div>
    </div>
  )
}