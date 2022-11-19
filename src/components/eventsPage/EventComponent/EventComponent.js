import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios';

// Import CSS
import './EventComponent.css';

export default function EventComponent(props) {

  const [isLogged, setLogged] = useState(false);
  const [userID, setUserID] = useState('');

  const navigate = useNavigate();

  const [going, setGoing] = useState(false);
  const [notGoing, setNotGoing] = useState(false);

  const [eventDescLength] = useState(props.eventDesc.length);

  const [author, setAuthor] = useState({});

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
            if (res.data.goingEvents.includes(props.eventID)) {
              setGoing(true);
            } else {
              setGoing(false);
            }

            if (res.data.notGoingEvents.includes(props.eventID)) {
              setNotGoing(true);
            } else {
              setNotGoing(false);
            }
          }
        })
    } else {
      setLogged(false);
    }

    Axios.get(`https://spartansocial-api.herokuapp.com/users/${props.eventCreator}`)
      .then(res => {
        setAuthor(res.data);
      })
      .catch(err => {
        console.log(err);
      })


  }, [])

  function addGoing() {
    Axios.post(`https://spartansocial-api.herokuapp.com/events/${props.eventID}/going`, {userID});
    setGoing(true);
  }

  function removeGoing() {
    Axios.delete(`https://spartansocial-api.herokuapp.com/events/${props.eventID}/going`, {data: {userID}});
    setGoing(false);
  }

  function addNotGoing() {
    Axios.post(`https://spartansocial-api.herokuapp.com/events/${props.eventID}/notGoing`, {userID})
    setNotGoing(true);
  }
  
  function removeNotGoing() {
    Axios.delete(`https://spartansocial-api.herokuapp.com/events/${props.eventID}/notGoing`, {data: {userID}});
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
    <div className="eventComponent">
      <div className="eventComponent-content-container">

        <Link to={`/events/`+props.eventID+'/'+props.eventCreator} className="specificEvent-link">
          <h2 className="event-title">{props.eventTitle}</h2>
          
          {eventDescLength >= 200 ?
            <p className="event-desc">{props.eventDesc.substring(0, 200)}...</p>
          :
            <p className="event-desc">{props.eventDesc}</p>
          }
        
          <div className="eventAuthor-container">
            <p className="eventAuthor-caption">Event posted by: {author.firstName} {author.lastName}</p>
          </div>
        </Link>

        <div className="eventComponent-attendance">
          <button className={"attendance-btn eventGoing " + (going ? `eventGoing-active` : null )} onClick={handleClick} value="going">I'm going!</button>
          <button className={"attendance-btn eventNotGoing " + (notGoing ? `eventNotGoing-active` : null)} onClick={handleClick} value="notGoing">Not going</button>
        </div>
      </div>
    </div>

  )
} 