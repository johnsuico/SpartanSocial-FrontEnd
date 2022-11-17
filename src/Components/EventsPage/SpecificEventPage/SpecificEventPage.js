import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Axios from 'axios';

// Import CSS
import './SpecificEventPage.css'

// Import Components
import Navbar from '../../Navbar/navbar';

export default function SpecificEvent() {

  const [event, setEvent] = useState({});
  const [eventCreator, setEventCreator] = useState({});

  const [isLogged, setLogged] = useState(false);
  const [userID, setUserID] = useState('');
  const [going, setGoing] = useState(false);
  const [notGoing, setNotGoing] = useState(false);

  const {eventID, eventCreatorID} = useParams();

  const navigate = useNavigate();

  useEffect(() => {

    if(localStorage.getItem('user')) {
      setLogged(true);
      const userInStorage = JSON.parse(localStorage.getItem('user'));
      setUserID(userInStorage.user_id);

      Axios.get(`https://spartansocial-api.herokuapp.com/users/${userID}`)
        .then (res => {

          if (res.data.goingEvents === undefined) {
            // Wait and do nothing
          } else {
            if (res.data.goingEvents.includes(eventID)) {
              setGoing(true);
            } else {
              setGoing(false);
            }

            if (res.data.notGoingEvents.includes(eventID)) {
              setNotGoing(true);
            } else {
              setNotGoing(false);
            }
          }
        })
    } else {
      setLogged(false);
    }

    Axios.get(`https://spartansocial-api.herokuapp.com/events/${eventID}`)
      .then (res => {
        setEvent(res.data);
      })
      .catch (err => {
        console.log(err);
      })

    Axios.get(`https://spartansocial-api.herokuapp.com/users/${eventCreatorID}`)
      .then (res => {
        setEventCreator(res.data);
      })
      .catch (err => {
        console.log(err);
      })
  })

  function addGoing() {
    Axios.post(`https://spartansocial-api.herokuapp.com/events/${eventID}/going`, {userID});
    setGoing(true);
  }

  function removeGoing() {
    Axios.delete(`https://spartansocial-api.herokuapp.com/events/${eventID}/going`, {data: {userID}});
    setGoing(false);
  }

  function addNotGoing() {
    Axios.post(`https://spartansocial-api.herokuapp.com/events/${eventID}/notGoing`, {userID})
    setNotGoing(true);
  }
  
  function removeNotGoing() {
    Axios.delete(`https://spartansocial-api.herokuapp.com/events/${eventID}/notGoing`, {data: {userID}});
    setNotGoing(false);
  }

  function isGoing() {
    if (!going && !notGoing) {
      addGoing()
    } else if (!going && notGoing) {
      addGoing();
      removeNotGoing();
    } else {
      removeGoing();
    }
  }

  function isNotGoing() {
    if (!notGoing && !going) {
      addNotGoing();
    } else if (!notGoing && going) {
      addNotGoing();
      removeGoing();
    } else {
      removeNotGoing();
    }
  }

  function handleClick(e) {
    if (isLogged) {
      if (e.currentTarget.value === 'going') {
        isGoing();
      } else {
        isNotGoing();
      }
    } else {
      navigate(`/login`);
    }
  }

  return (
    <div className="specificEvent-page-container">
      <Navbar active="events" />
      <div className="specificEvent-page">
        <div className="specificEvent-content-container">
          <div className="specificEvent-header">
            <h2 className="specificEvent-title">{event.eventTitle}</h2>
            <p className="specificEvent-author">Event created by: {eventCreator.firstName} {eventCreator.lastName}</p>
          </div>

          <div className="specificEvent-desc-container">
            <p className="specificEvent-desc">{event.eventDesc}</p>
          </div>

          <div className="specificEvent-footer-container">
            <div className="eventComponent-attendance">
              <button className={"attendance-btn eventGoing " + (going ? `eventGoing-active` : null )} onClick={handleClick} value="going">I'm going!</button>
              <button className={"attendance-btn eventNotGoing " + (notGoing ? `eventNotGoing-active` : null)} onClick={handleClick} value="notGoing">Not going</button>
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}