import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Axios from 'axios';

// Importing CSS
import './ProfilePage.css';

// Import components
import Navbar from '../Navbar/navbar';
import PreviousPosts from './PreviousPosts/PreviousPosts';

// Import icons
import {FaCheckCircle} from 'react-icons/fa';

export default function ProfilePage() {

  const {userID} = useParams();

  const [user, setUser] = useState({});
  const [isAdmin, setAdmin] = useState(false);
  const [isMod, setMod] = useState(false);
  const [active, setActive] = useState('posts');

  useEffect(() => {
    Axios.get(`https://spartansocial-api.herokuapp.com/users/${userID}`)
      .then (res => {
        setUser(res.data);
        setAdmin(res.data.admin);
        setMod(res.data.mod);
      })
      .catch (err => {
        console.log(err);
      })
  })

  const newDate = new Date(user.gradDate);
  const gradDate = newDate.getUTCFullYear();

  function clickActive(e) {
    setActive(e.currentTarget.value);
  }

  return (
    <div className="profilePage-main-container">
      <Navbar active="profile" />

      <div className="profilePage-container">
        <div className="profilePage">

          {/* Start profile page header */}
          <div className="profilePage-header">
            <div className="profilePage-default-pic"></div>
            <div className="profilePage-header-info">
              <h2 className="profilePage-name">{user.firstName} {user.lastName}</h2>

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
            <h3 className="profilePage-section-title">About {user.firstName} {user.lastName}</h3>

            <div className="profilePage-bio-container">
              <p className="profilePage-text">{user.bio}</p>
            </div>

            <div className="profilePage-pronouns-container">
              <h3 className="profilePage-section-title">Pronouns: </h3>
              {user.pronouns ?
                <p className="profilePage-pronouns">{user.pronouns}</p>
              :
                <p className="profilePage-pronouns">None specified</p>
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
            </div>
          </div>
          {/* End previous activity section */}

        </div>
      </div>
    </div>
  )

}