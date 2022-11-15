import React, {useEffect, useState} from "react";
import Axios from 'axios';

// Importing CSS
import './GeneralForum.css';

// Importing Components
import SubforumModule from '../SubforumModule/SubforumModule';

export default function GeneralForum(props) {

  const [subForums, setSubforums] = useState([]);

  useEffect(() => {
    Axios.get(`https://spartansocial-api.herokuapp.com/forums/mainForum/${props.mainForumID}/subForum`)
    .then(res => {
      setSubforums(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  })

  return (
    <div className="subforums">
      {
        subForums.map(sub => 
          <SubforumModule
            subForumTitle   = {sub.subForumTitle}
            subForumDesc    = {sub.subForumDesc}
            forumPostCount  = {sub.forumPosts.length}
            parentForumId   = {props.mainForumID}
            subForumID      = {sub._id}
            key             = {sub._id}
          />
        )
      }
    </div>
  )
}