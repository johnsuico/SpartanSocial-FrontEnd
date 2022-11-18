import React, {useEffect, useState} from 'react';
import Axios from 'axios';

// Import CSS
import './PreviousEvents.css';

// Import components
import PreviousEventComponent from './PreviousEventsComponent/PreviousEventsComponent';


export default function PreviousEvents(props) {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get(`https://spartansocial-api.herokuapp.com/users/${props.userID}/events`)
      .then (res => {
        setEvents(res.data);
      })
      .catch (err => {
        console.log(err);
      })
  })

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