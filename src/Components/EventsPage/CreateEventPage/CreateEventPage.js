import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

// Importing CSS
import './CreateEventPage.css';

// Importing components
import Navbar from '../../Navbar/navbar';

export default function CreateEventPage() {

  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventCreator, setEventCreator] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user')) {
      const userInStorage = JSON.parse(localStorage.getItem('user'));
      setEventCreator(userInStorage.user_id)
    } 
  })

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

  function onSubmit(e) {
    e.preventDefault();

    const newEvent = {
      eventTitle,
      eventDesc,
      eventDate,
      eventCreator
    }

    Axios.post(`https://spartansocial-api.herokuapp.com/events/`, newEvent)
      .then(navigate(`/events`))
      .catch(err => console.log(err));
  }

  return (
    <div className="createEventPage-container">
      <Navbar active="events" />

      <div className="createEvent-container-form">
        <form className="createEvent-form" onSubmit={onSubmit}>
          <h2 className="createEvent-form-title">Create an event</h2>

          <div className="event-form-header-container">
            <div className="event-form-field event-form-header-field">
              <label className="event-form-label">Event Title</label>
              <input type="text" name="eventTitle" className="event-form-input" onChange={handleChange} value={eventTitle}/>
            </div>

            <div className="event-form-field">
              <label className="event-form-label">Event Date</label>
              <input type="date" name="eventDate" className="event-form-input event-date" onChange={handleChange} value={eventDate} required/>
            </div>
          </div>

          <div className="event-form-field">
            <label className="event-form-label">Event Description</label>
            <textarea name="eventDesc" id="" cols="30" rows="10" className="event-form-input-textarea" onChange={handleChange} value={eventDesc}></textarea>
          </div>

          <div className="createEvent-submit-container">
            <button className="createEvent-submit-btn" type="submit">Create event</button>
          </div>

        </form>
      </div>
    </div>
  )

}