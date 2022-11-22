import React from 'react';
import {Link} from 'react-router-dom';

// Import CSS
import './PreviousEventsComponent.css';

export default function PreviousEventComponent(props) {

  // Parses the date into something the user can easily read.
  const newDate = new Date(props.eventDate);
  const eventDate = newDate.toDateString();

  return (
    <div className="previousEvent-container">
      <Link to={`/events/`+props.eventID+'/'+props.eventCreator} className="previousEvent-link">
        <div className="previousEvent">
          <div className="previousEvent-header">
            <h2 className="previousEvent-title">{props.eventTitle}</h2>
            <p className="previousEvent-date">Event date: {eventDate}</p>
          </div>

          <div className="previousEvent-content">
            <h2 className="previousEvent-title">Event Description:</h2>
            <p className="previousEvent-desc">{props.eventDesc}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}