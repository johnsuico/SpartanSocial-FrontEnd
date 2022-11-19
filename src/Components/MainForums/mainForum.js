import React, {useEffect, useState} from "react";
import Axios from 'axios';

// Importing CSS
import './GeneralForum.css';

// Importing Components
import SubforumModule from '../SubforumModule/SubforumModule';

export default function GeneralForum(props) {

  const [subForums, setSubforums] = useState([]);

  useEffect(() => {

    // Check if props.mainForumID has loaded the value
    // If not, do nothing and wait
    // Once loaded, display the general forums. This just gets rid of the console error.
    if (props.mainForumID === undefined || props.mainForumID === '') {
      // Do nothing, wait for it to load
    } else {
      Axios.get(`https://spartansocial-api.herokuapp.com/forums/mainForum/${props.mainForumID}/subForum`)
      .then(res => {
        setSubforums(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [props.mainForumID])

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