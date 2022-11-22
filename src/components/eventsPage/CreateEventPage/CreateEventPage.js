import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

// Importing CSS
import './CreateEventPage.css';

// Importing components
import Navbar from '../../navbar/navbar';

export default function CreateEventPage() {

  // React states (variables) to hold the data needed for this page.
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventCreator, setEventCreator] = useState('');

  // Used to reroute to different pages.
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a user in local storage. Which means that the user is logged in.
    if(localStorage.getItem('user')) {
      // Grab the user in storage.
      const userInStorage = JSON.parse(localStorage.getItem('user'));
      // Set the eventCreator to the userID of the currently logged in user.
      setEventCreator(userInStorage.user_id)
    } 
  }, [])

  // Handles any input field changes based on the name of the input field.
  function handleChange(e) {
    const {name, value} = e.target;

    switch (name) {
      case "eventTitle":
        setEventTitle(value);
        break;
      case "eventDesc":
          setEventDesc(value);
          break;
      case "eventDate":
          setEventDate(value);
          break;
      default:
        // No default
    }
  }

  // Handles form submission.
  function onSubmit(e) {
    // Prevents the page from automatically reloading when the submit button is pressed.
    e.preventDefault();

    // New JSON to hold the newEvent information to be sent to the database.
    const newEvent = {
      eventTitle,
      eventDesc,
      eventDate,
      eventCreator
    }

    // API POST request to the database with the newEvent information as the payload.
    Axios.post(`https://spartansocial-api.herokuapp.com/events/`, newEvent)
      // Go back to the event page if the event was created successfully.
      .then(navigate(`/events`))
      // Print to the console, if there was a problem with creating an event.
      .catch(err => console.log(err));
  }

  return (
    <div className="createEventPage-container">
      {/* Navbar with events set as the actie tab. */}
      <Navbar active="events" />

      <div className="createEvent-container-form">
        {/* The start of the create event form with an onSubmit function. */}
        <form className="createEvent-form" onSubmit={onSubmit}>
          <h2 className="createEvent-form-title">Create an event</h2>

          {/* Event form header container. */}
          <div className="event-form-header-container">

            {/* The event title input field group */}
            <div className="event-form-field event-form-header-field">
              <label className="event-form-label">Event Title</label>
              <input type="text" name="eventTitle" className="event-form-input" onChange={handleChange} value={eventTitle}/>
            </div>

            {/* The event date input field group. */}
            <div className="event-form-field">
              <label className="event-form-label">Event Date</label>
              <input type="date" name="eventDate" className="event-form-input event-date" onChange={handleChange} value={eventDate} required/>
            </div>
          </div>

          {/* The event description input field group. */}
          <div className="event-form-field">
            <label className="event-form-label">Event Description</label>
            <textarea name="eventDesc" id="" cols="30" rows="10" className="event-form-input-textarea" onChange={handleChange} value={eventDesc}></textarea>
          </div>

          {/* The submit button for the form. */}
          <div className="createEvent-submit-container">
            <button className="createEvent-submit-btn" type="submit">Create event</button>
          </div>

        </form>
      </div>
    </div>
  )

}