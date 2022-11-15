import React, {useState, useEffect} from "react";
import Axios from 'axios';

// Importing CSS
import './landing.css';

// Importing Components
import Navbar from '../Navbar/navbar';
import GeneralForum from '../MainForums/mainForum';

export default function Landing() {

  const [active, setActive] = useState('general');
  const [generalID, setGeneral] = useState('');
  const [sjsuID, setSJSU] = useState('')
  const [tutorID, setTutor] = useState('');

  useEffect(() => {
    Axios.get(`https://spartansocial-api.herokuapp.com/forums/mainForum/`)
    .then (res => {
      setGeneral(res.data[0]._id);
      setSJSU(res.data[1]._id);
      setTutor(res.data[2]._id);
    })
    .catch (err => {
      console.log(err);
    })
  })

  function clickGeneral() {
    setActive('general');
  }

  function clickSJSU() {
    setActive('sjsu');
  }

  function clickTutor() {
    setActive('tutor')
  }

  return (
    <div className="landing">
      <Navbar />
      <div className="landing-content-container">
        <div className="forum-category-container">
          <button className={
            active === 'general' ?
            `forum-category active` :
            'forum-category'
          } onClick={clickGeneral}>
            General
          </button>
          <button className={
            active === 'sjsu' ?
            `forum-category active` :
            'forum-category'
          } onClick={clickSJSU}>
            SJSU Help
          </button>
          <button className={
            active === 'tutor' ?
            `forum-category active`:
            'forum-category'
          } onClick={clickTutor}>
            Academic Help
          </button>
        </div>
        
        {active === 'general' ? <GeneralForum mainForumID={generalID}/> : ''}

        {active === 'sjsu' ? <GeneralForum mainForumID={sjsuID}/> : ''}

        {active === 'tutor' ? <GeneralForum mainForumID={tutorID}/> : ''}

      </div>
    </div>
  )
}