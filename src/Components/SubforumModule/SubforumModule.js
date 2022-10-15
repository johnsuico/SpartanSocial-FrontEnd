import React, { useState, useEffect } from "react";
import Axios from 'axios';

// Icons
import {FaListAlt, FaClock} from "react-icons/fa";

// Import CSS
import './SubforumModule.css';

export default function Subforum({subforumID}) {
  const [subForum, setSubforum] = useState('');
  const [forumPostLength, setPostLength] = useState(0);
  const [subForumDate, setForumDate] = useState();

  useEffect(() => {
    Axios.get(`https://spartansocial-api.herokuapp.com/forums/subForum/${subforumID}`)
    .then(res => {
      setSubforum(res.data);
      setPostLength(res.data.forumPosts.length);
      let date = new Date(res.data.subForumDate);
      setForumDate(date.toDateString());
    })
    .catch(err => {
      console.log(err);
    })
  })

  return (
    <div className="subforum-container">
      <div className="subforum-content">
        <div className="subforum-title">{subForum.subForumTitle}</div>
        <div className="subforum-desc">{subForum.subForumDesc}</div>
        <div className="subforum-info">
          <div className="info-container">
            <FaListAlt className="info-icon"/>
            <div className="subforum-postCount">{forumPostLength}</div>
          </div>
          <div className="info-container">
            <FaClock className="info-icon"/>
            <div className="subforum-date">{subForumDate}</div>
          </div>
        </div>
      </div>
    </div>
  )
}