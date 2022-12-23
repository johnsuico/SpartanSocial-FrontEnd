import React, {useEffect, useState} from 'react';
import Axios from 'axios';

// Import CSS
import './PreviousEvents.css';

// Import components
import PreviousEventComponent from './PreviousEventsComponent/PreviousEventsComponent';


export default function PreviousEvents(props) {

  // React state to hold onto the event data.
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Grab all of the events that the user has created.
    Axios.get(process.env.REACT_APP_API_BASE_URL+`users/${props.userID}/events`)
      .then (res => {
        setEvents(res.data);
      })
      .catch (err => {
        console.log(err);
      })
  }, [events])

  return (
    <div className="previousPosts-container">
      {
        events.slice(0).reverse().map(event =>
          <PreviousEventComponent 
            eventTitle    = {event.eventTitle}
            eventDesc     = {event.eventDesc}
            eventCreator  = {event.eventCreator}
            eventDate     = {event.eventDate}
            eventID       = {event._id}
            key           = {event._id}
          />
        )
      }
    </div>
  );
}