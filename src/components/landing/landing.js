import React, {useState, useEffect} from "react";
import Axios from 'axios';

// Importing CSS
import './landing.css';

// Importing Components
import Navbar from '../navbar/navbar';
import GeneralForum from '../mainForums/mainForum';

export default function Landing() {

  // React states to hold information needed for this page.
  const [active, setActive] = useState('general');
  const [generalID, setGeneral] = useState('');
  const [sjsuID, setSJSU] = useState('')
  const [tutorID, setTutor] = useState('');

  useEffect(() => {
    // API GET request to fetch all of the main forum IDs.
    Axios.get(`https://spartansocial-api.herokuapp.com/forums/mainForum/`)
    .then (res => {
      setGeneral(res.data[0]._id);
      setSJSU(res.data[1]._id);
      setTutor(res.data[2]._id);
    })
    .catch (err => {
      console.log(err);
    })
  }, [])

  // If the user clicks on the general main forum tab, set the active to "general"
  function clickGeneral() {
    setActive('general');
  }

  // If the user clicks on the sjsu main forum tab, set the active to "sjsu"
  function clickSJSU() {
    setActive('sjsu');
  }

  // If the user clicks on the tutor main forum tab, set the active to "tutor"
  function clickTutor() {
    setActive('tutor')
  }

  return (
    <div className="landing">
      {/* Navbar with the active tab as forums */}
      <Navbar active="forums"/>

      {/* The start of the landing page content container */}
      <div className="landing-content-container">

        {/* The start of the forum category container */}
        <div className="forum-category-container">
          <div className="category-caption">
            <p>Categories</p>
          </div>

          {/* The main forum category selectors */}
          {/* Depending on what the user chooses, the categories will change their appearance to show which one was selected. */}
          <div className="category-selectors">
            <button className={
              active === 'general' ?
              `forum-category active-cat` :
              'forum-category'
            } onClick={clickGeneral}>
              General
            </button>
            <button className={
              active === 'sjsu' ?
              `forum-category active-cat` :
              'forum-category'
            } onClick={clickSJSU}>
              SJSU Help
            </button>
            <button className={
              active === 'tutor' ?
              `forum-category active-cat`:
              'forum-category'
            } onClick={clickTutor}>
              Academic Help
            </button>
          </div>
        </div>
        
        {/* Based off of the active category, the subforums of the active category will be shown. */}
        {active === 'general' ? <GeneralForum mainForumID={generalID}/> : ''}

        {active === 'sjsu' ? <GeneralForum mainForumID={sjsuID}/> : ''}

        {active === 'tutor' ? <GeneralForum mainForumID={tutorID}/> : ''}

      </div>
    </div>
  )
}