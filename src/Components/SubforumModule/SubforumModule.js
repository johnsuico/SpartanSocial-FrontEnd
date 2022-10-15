import React from "react";
import {Link} from "react-router-dom";

// Icons
import {FaListAlt, FaClock} from "react-icons/fa";

// Import CSS
import './SubforumModule.css';

export default function Subforum(props) {

  let date = new Date(props.subForumDate);
  const subForumDate = date.toDateString();

  return (
    <Link to={`/general/subforum/${props.subForumID}`} className="subforum-link">
      <div className="subforum-container">
        <div className="subforum-content">
          <div className="subforum-title">{props.subForumTitle}</div>
          <div className="subforum-desc">{props.subForumDesc}</div>
          <div className="subforum-info">
            <div className="info-container">
              <FaListAlt className="info-icon"/>
              <div className="subforum-postCount">{props.forumPostCount}</div>
            </div>
            <div className="info-container">
              <FaClock className="info-icon"/>
              <div className="subforum-date">{subForumDate}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}