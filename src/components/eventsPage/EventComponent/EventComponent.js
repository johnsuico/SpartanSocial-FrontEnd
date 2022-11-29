import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios';

// Import CSS
import './EventComponent.css';

export default function EventComponent(props) {

  // React hooks to hold on to data needed for the page.
  const [isLogged, setLogged] = useState(false);
  const [userID, setUserID] = useState('');
  const [going, setGoing] = useState(false);
  const [notGoing, setNotGoing] = useState(false);
  const [eventDescLength] = useState(props.eventDesc.length);
  const [author, setAuthor] = useState({});

  // Rename useNavigate to navigate.
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and set setLogged to true if they are logged in.
    if(localStorage.getItem('user')) {
      setLogged(true);

      // Grab user data from their login.
      const userInStorage = JSON.parse(localStorage.getItem('user'));
      // Grab the logged in user's ID and place it into the userID hook.
      setUserID(userInStorage.user_id);

      // API GET request to get account information of the logged in user.
      Axios.get(`https://spartansocial-api.herokuapp.com/users/${userID}`)
        .then (res => {

          // IF statement used to check if the data has loaded.
          // If removed, the website will crash as the website will attempt to grab information that does not exist.
          if (res.data.goingEvents === undefined) {
            // Wait and do nothing
          } else {
            // Check if the user is going to the current loaded event.
            // If yes, then set setGoing to true.
            if (res.data.goingEvents.includes(props.eventID)) {
              setGoing(true);
            } else {
              setGoing(false);
            }
            
            // Check if the user has marked themselves as not going to the current loaded event.
            // If already marked, then setNotGoing to true.
            if (res.data.notGoingEvents.includes(props.eventID)) {
              setNotGoing(true);
            } else {
              setNotGoing(false);
            }
          }
        })
    } else {
      // If they are not logged in, set the hook to false.
      setLogged(false);
    }

    // API GET request to grab the event creator's details.
    Axios.get(`https://spartansocial-api.herokuapp.com/users/${props.eventCreator}`)
      .then(res => {
        // Set the author hook to the data from the database.
        setAuthor(res.data);
      })
      .catch(err => {
        // Log any errors to the web console.
        console.log(err); 
      })


  }, [])

  // Function that makes an API POST request to tell the database the current logged in user is going to the event.
  function addGoing() {
    Axios.post(`https://spartansocial-api.herokuapp.com/events/${props.eventID}/going`, {userID});
    setGoing(true);
  }

  // Function that makes an API DELETE request to tell the database the current logged in user wishes to remove their going status.
  function removeGoing() {
    Axios.delete(`https://spartansocial-api.herokuapp.com/events/${props.eventID}/going`, {data: {userID}});
    setGoing(false);
  }

  // API POST request to change the current user's event status to not going.
  function addNotGoing() {
    Axios.post(`https://spartansocial-api.herokuapp.com/events/${props.eventID}/notGoing`, {userID})
    setNotGoing(true);
  }

  // API DELETE request to remove the current user's not going event status.
  function removeNotGoing() {
    Axios.delete(`https://spartansocial-api.herokuapp.com/events/${props.eventID}/notGoing`, {data: {userID}});
    setNotGoing(false);
  }

  // Function that is called once a user clicks on a "Not Going" or "Going" button.
  // This function changes the various attendance status of the user depending on if they had already had an event status.
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

  // Function that is called once a user clicks on a "Not Going" or "Going" button.
  // This function changes the various attendance status of the user depending on if they had already had an event status.
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

  // Handles if the user is logged in or not.
  // If logged in, they can click going or not going statuses.
  // If NOT logged in, redirect them to the login page.
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

  // Grabs the date for the event and parses it so that it can be displayed properly in the browser.
  const newDate = new Date(props.eventDate);
  newDate.setDate(newDate.getDate()+1);
  const eventDate = newDate.toLocaleDateString();

  return (
    <div className="eventComponent">
      <div className="eventComponent-content-container">

        {/* A link to the specific event. */}
        <Link to={`/events/`+props.eventID+'/'+props.eventCreator} className="specificEvent-link">
          <h2 className="event-title">{props.eventTitle}</h2>

          <p className="eventDate">{eventDate}</p>
          
          {/* If the event description length is greater than 200 characters then only display the first 200 characters. */}
          {/* If less than 200 characters, then display the full event description. */}
          {/* This was done so that certain events do not have more text content than others in the event main page, which is more like a preview. */}
          {eventDescLength >= 200 ?
            <p className="event-desc">{props.eventDesc.substring(0, 100)}...</p>
          :
            <p className="event-desc">{props.eventDesc}</p>
          }
        
          <div className="eventAuthor-container">
            {author.useDisplayName ?
              <p className="eventAuthor-caption">Event posted by: {author.userName}</p>
            :
              <p className="eventAuthor-caption">Event posted by: {author.firstName} {author.lastName}</p>
            }
          </div>
        </Link>

        <div className="eventComponent-attendance">
          {/* The buttons visual changes depending on the user's current event status. */}
          {/* The className changes depending on the user's event status. */}
          <button className={"attendance-btn eventGoing " + (going ? `eventGoing-active` : null )} onClick={handleClick} value="going">I'm going!</button>
          <button className={"attendance-btn eventNotGoing " + (notGoing ? `eventNotGoing-active` : null)} onClick={handleClick} value="notGoing">Not going</button>
        </div>
      </div>
    </div>

  )
} 