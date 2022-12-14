import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Axios from 'axios';

// Import CSS
import './SpecificEventPage.css'

// Import Components
import Navbar from '../../navbar/navbar';

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
      const userIDTemp = userInStorage.user_id;

      Axios.get(process.env.REACT_APP_API_BASE_URL+`users/${userIDTemp}`)
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

    Axios.get(process.env.REACT_APP_API_BASE_URL+`events/${eventID}`)
      .then (res => {
        setEvent(res.data);
      })
      .catch (err => {
        console.log(err);
      })

    Axios.get(process.env.REACT_APP_API_BASE_URL+`users/${eventCreatorID}`)
      .then (res => {
        setEventCreator(res.data);
      })
      .catch (err => {
        console.log(err);
      })
  }, [])

  function addGoing() {
    Axios.post(process.env.REACT_APP_API_BASE_URL+`events/${eventID}/going`, {userID});
    setGoing(true);
  }

  function removeGoing() {
    Axios.delete(process.env.REACT_APP_API_BASE_URL+`events/${eventID}/going`, {data: {userID}});
    setGoing(false);
  }

  function addNotGoing() {
    Axios.post(process.env.REACT_APP_API_BASE_URL+`events/${eventID}/notGoing`, {userID});
    setNotGoing(true);
  }
  
  function removeNotGoing() {
    Axios.delete(process.env.REACT_APP_API_BASE_URL+`events/${eventID}/notGoing`, {data: {userID}});
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

  function deleteEvent() {
    // DELETE /events/:eventID
    Axios.delete(process.env.REACT_APP_API_BASE_URL+`events/${eventID}`);

    navigate(`/events`);
  }

  const newDate = new Date(event.eventDate);
  const eventDate = newDate.toDateString();

  return (
    <div className="specificEvent-page-container">
      <Navbar active="events" />
      <div className="specificEvent-page">
        <div className="specificEvent-content-container">
          <div className="specificEvent-header">
            <div className="specificEvent-header-container">
              <h2 className="specificEvent-title">{event.eventTitle}</h2>
              {userID === eventCreatorID ?
                <p className="deleteEvent" onClick={deleteEvent}>Delete Event</p>
              :
                null
              }
            </div>
            {eventCreator.useDisplayName ?
              <p className="specificEvent-author">Event created by: {eventCreator.userName}</p>
            :
              <p className="specificEvent-author">Event created by: {eventCreator.firstName} {eventCreator.lastName}</p>
            }
            <p className="specificEvent-info">Event Date: {eventDate}</p>
            <p className="specificEvent-info">Event Location: {event.eventLocation}</p>
          </div>

          <div className="specificEvent-desc-container">
            <p className="specificEvent-desc-title">Event Description:</p>
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