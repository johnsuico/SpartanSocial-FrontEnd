import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Axios from 'axios';

// Importing CSS
import './ProfilePage.css';

// Import components
import Navbar from '../navbar/navbar';
import PreviousPosts from './PreviousPosts/PreviousPosts';
import PreviousComments from './PreviousComments/PreviousComments';
import PreviousEvents from './PreviousEvents/PreviousEvents';

// Import icons
import {FaCheckCircle} from 'react-icons/fa';

// Import default picture
import DefaultPicture from '../DefaultPicture.svg';

export default function ProfilePage() {

  // Used to redirect to different pages.
  const navigate = useNavigate();

  // Grabs the parameters from the URL.
  const {userID} = useParams();

  // React states to hold data.
  const [user, setUser] = useState({});
  const [currentUserID, setCurrentUserID] = useState('')
  const [isAdmin, setAdmin] = useState(false);
  const [isMod, setMod] = useState(false);
  const [active, setActive] = useState('posts');

  useEffect(() => {

    // Check if the user is logged in and grab the userID.
    if (localStorage.getItem('user')) {
      const userInStorage = JSON.parse(localStorage.getItem('user'));
      setCurrentUserID(userInStorage.user_id)
    }

    // API GET request to fetch the logged in user's data.
    Axios.get(`https://spartansocial-api.herokuapp.com/users/${userID}`)
      .then (res => {
        setUser(res.data);
        setAdmin(res.data.admin);
        setMod(res.data.mod);
      })
      .catch (err => {
        console.log(err);
      }) 

  }, [])

  // Takes the date and parses it into something more readable for the user.
  const newDate = new Date(user.gradDate);
  const gradDate = newDate.getUTCFullYear();

  // Sets the active chosen category.
  function clickActive(e) {
    setActive(e.currentTarget.value);
  }

  // Function to direct the page to the edit user page.
  function editProfile() {
    navigate(`/profilePage/${userID}/edit`);
  }

  return (
    <div className="profilePage-main-container">
      <Navbar active="profile" />

      <div className="profilePage-container">
        <div className="profilePage">

          {/* Start profile page header */}
          <div className="profilePage-header">
            {/* <div className="profilePage-default-pic"></div> */}
            <img src={DefaultPicture} alt="Default Profile" className="profilePage-default-pic" />
            <div className="profilePage-header-info">
              <div className="profilePage-header-top-container">
                {user.useDisplayName ?
                  <h2 className="profilePage-name">{user.userName}</h2>
                :
                  <h2 className="profilePage-name">{user.firstName} {user.lastName}</h2>
                }

                {/* Only show the edit profil button, if the user is on their own profile page. */}
                {userID === currentUserID ?
                  <p className="editProfile-link" onClick={editProfile}>Edit Profile</p>
                :
                  null
                }

              </div>

              {/* Logic to show if a user is SpartanSocial Admin or Moderator. */}
              {isAdmin ? 
                <div className="adminCheck-container">
                  <FaCheckCircle className="adminCheck" />
                  <p className="adminCheck-caption">SpartanSocial Admin</p>
                </div>
              :
                isMod ?
                <div className="modCheck-container">
                  <FaCheckCircle className="adminCheck" />
                  <p className="adminCheck-caption">SpartanSocial Moderator</p>
                </div>
                :
                null
              }

              <p className="profilePage-additional-info">{user.major} / Class of {gradDate} / {user.isStudent ? 'Current student': 'Graduated'}</p>
            </div>
          </div>
          {/* End profile page header */}

          {/* Start profile page bio section */}
          <div className="profilePage-about-container">
            {user.useDisplayName ?
              <h3 className="profilePage-section-title">About {user.userName}</h3>
            :
              <h3 className="profilePage-section-title">About {user.firstName} {user.lastName}</h3>
            }

            <div className="profilePage-bio-container">
              {user.bio ? 
                <p className="profilePage-text">{user.bio}</p>
              :
                <p className="profilePage-text">No bio</p>
              }
            </div>

            <div className="profilePage-pronouns-container">
              <h3 className="profilePage-section-title">Pronouns: </h3>
              {user.pronouns ?
                <p className="profilePage-text">{user.pronouns}</p>
              :
                <p className="profilePage-text">None specified</p>
              }
            </div>
          </div>
          {/* End profile page bio section */}

          {/* Start previous activity section */}
          <div className="previous-activity-container">
            <div className="previous-activity-selector">
              <h3 className="previous-activity-title">Previous activity</h3>

              {/* Start previous activity buttons */}
              <div className="previous-activity-button-container">
                <button className={"previous-activity-buttons " + (active === 'posts' ? `previous-activity-active` : null)} onClick={clickActive} value="posts">Posts</button>
                <button className={"previous-activity-buttons " + (active === 'comments' ? `previous-activity-active` : null)} onClick={clickActive} value="comments">Comments</button>
                <button className={"previous-activity-buttons " + (active === 'events' ? `previous-activity-active` : null)} onClick={clickActive} value="events">Events</button>
              </div>
              {/* End previous activity buttons */}

            </div>

            <div className="previous-acitivity-module">
              {active === 'posts' ?
                <PreviousPosts userID={userID} />
              :
                null
              }

              {active === 'comments' ?
                <PreviousComments userID={userID} />
              :
                null
              }

              {active === 'events' ?
                <PreviousEvents userID={userID} />
              :
                null
              }
            </div>
          </div>
          {/* End previous activity section */}

        </div>
      </div>
    </div>
  )

}