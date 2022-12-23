import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';

// Importing CSS
import './EventsMainPage.css';

// Import components
import Navbar from '../navbar/navbar';
import EventComponent from './EventComponent/EventComponent';

// Importing Icons
import {FaPlus} from 'react-icons/fa';

export default function EventsMainPage() {

  // React hooks (variables) to hold information needed for the page.
  const [events, setEvents] = useState([]);
  const [isEmpty, setEmpty] = useState(true);
  const [isLogged, setLogged] = useState(false);

  // Renaming the useNavigate hook from react-router-dom to navigate.
  const navigate = useNavigate();

  // useEffect is used to run code once the page loads, only runs once per render.
  useEffect(() => {

    // Check if the user is logged in. Set "isLogged" state to true if logged in.
    if(localStorage.getItem('user')) {
      setLogged(true);
    } else {
      setLogged(false);
    }

    // API GET request to fetch all the events in the database.
    Axios.get(process.env.REACT_APP_API_BASE_URL+`events`)
      .then(res => {
        // Store the data in the events hook.
        setEvents(res.data);
        // If the event array from the database is not equal to 0, then the array is not empty. Set to false.
        if (res.data.length !== 0) {
          setEmpty(false);
        }
      })
      .catch(err => {
        console.log(err); // If there are any errors, output them to the console. Only viewable in developer mode.
      })
  }, [events])

  // Handles where to redirect the user depending on if they are logged on or not.
  // If they are logged on, take them to the form. Since only people with accounts can create events.
  // If they are NOT logged on, take them to the login page.
  function createEventPage() {
    if (isLogged) {
      navigate(`/events/create`);
    } else {
      navigate(`/login`);
    }
  }

  return (
    <div className="eventsMainPage">
      {/* Navbar component with "events" as the active tab. */}
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
          {/* Go through the array and pass through the data to the EventComponent */}
            {
              events.map(event => 
                <EventComponent 
                  eventTitle    = {event.eventTitle}
                  eventDesc     = {event.eventDesc}
                  eventDate     = {event.eventDate}
                  eventCreator  = {event.eventCreator}
                  eventLocation = {event.eventLocation}
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