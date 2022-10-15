import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

// Importing Components
import SubforumModule from '../SubforumModule/SubforumModule';

export default function GeneralForum() {

  const [subForums, setSubforums] = useState([]);

  useEffect(() => {
    Axios.get(`https://spartansocial-api.herokuapp.com/forums/mainForum/634a20dcbf7456efd0490a1f/subForum`)
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
            subForumDate    = {sub.subForumDate}
            subForumID      = {sub._id}
            key             = {sub._id}
          />
        )
      }
    </div>
  )
}