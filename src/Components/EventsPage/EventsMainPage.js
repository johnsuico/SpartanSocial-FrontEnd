import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';

// Importing CSS
import './EventsMainPage.css';

// Import components
import Navbar from '../Navbar/navbar';
import EventComponent from './EventComponent/EventComponent';

// Importing Icons
import {FaPlus} from 'react-icons/fa';

export default function EventsMainPage() {

  const [events, setEvents] = useState([]);
  const [isEmpty, setEmpty] = useState(true);
  const [isLogged, setLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user')) {
      setLogged(true);
    } else {
      setLogged(false);
    }

    Axios.get(`https://spartansocial-api.herokuapp.com/events`)
      .then(res => {
        setEvents(res.data);
        if (res.data.length !== 0) {
          setEmpty(false);
        }
      })
      .catch(err => {
        console.log(err);
      })
  })

  function createEventPage() {
    if (isLogged) {
      navigate(`/events/create`);
    } else {
      navigate(`/login`);
    }
  }

  return (
    <div className="eventsMainPage">
      <Navbar active="events" />

      <div className="eventMainPage-container">

        {/* Banner for event page */}
        <div className="eventMainPageBanner-container">
          <h1 className="eventMainPageBanner-header">Welcome to the events page.</h1>
          <p className="eventMainPageBanner-caption">You can find upcoming events here, or post your own.</p>
        </div>

        {/* Post an event */}
        {/* If user is logged in, take them to event creation form */}
        {/* If user is NOT logged in, take them to login page */}
        <div className="postEvent-container">
          <div className="postEvent-content-container">
            <p className="postEvent-caption">Post an upcoming event.</p>
            <div className="postEvent-button" onClick={createEventPage}>
              <FaPlus className="postEvent-plus"/>
              <p className="postEvent-button-caption">Post Event</p>
            </div>
          </div>
        </div>

        {/* Modules for events */}
        {/* If there are no events, show a different page */}
        { isEmpty ?
          <div className="noEvents-container">
            <h2>No events yet, be the first one to post an event.</h2>
          </div>
          :
          <div className="eventComponent-container">
            {
              events.map(event => 
                <EventComponent 
                  eventTitle    = {event.eventTitle}
                  eventDesc     = {event.eventDesc}
                  eventDate     = {event.eventDate}
                  eventCreator  = {event.eventCreator}
                  eventID       = {event._id}
                  key           = {event._id}
                />
              )
            }
          </div>
        }

      </div>
    </div>
  )
}