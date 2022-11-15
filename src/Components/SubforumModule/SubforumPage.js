import React, {useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';

// Importing CSS
import './SubforumModule.css';

// Importing Icons
import {FaPlus} from 'react-icons/fa';

// Importing Components
import Navbar from '../Navbar/navbar';
import PostModule from '../PostModule/PostModule';

export default function SubforumPage() {

  const [posts, setPosts] = useState([]);
  const [parentForum, setParentForum] = useState({});
  const [isLogged, setLogged] = useState(false);

  let {parentForumId, subForumId} = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // Get all subforum posts
    Axios.get(`https://spartansocial-api.herokuapp.com/forums/subForum/${subForumId}/post`)
    .then (res => {
      setPosts(res.data);
      // console.log(res.data[0].forumComments.length)
    })
    .catch (err => {
      console.log(err);
    });

    // Get subforum data for title and desc
    Axios.get(`https://spartansocial-api.herokuapp.com/forums/subforum/${subForumId}`)
    .then (res => {
      setParentForum(res.data);
    })
    .catch (err => {
      console.log(err);
    })

    if(localStorage.getItem('user')) {
      setLogged(true);
    } else {
      setLogged(false);
    }

  }, [])

  function createPostPage() {
    // navigate(`/${parentForumId}/${subForumId}/post/create`);
  }

  return (
    <div className="subforum-page">
      <Navbar active="forums"/>
      <div className="subforum-page-container">
        <div className="subforum-info-container">
          <h1 className="subForumTitle">Welcome to the {parentForum.subForumTitle} subforum.</h1>
          <p className="subForumDesc">{parentForum.subForumDesc}</p>
        </div>

        {/* Only show this area if user is logged in */}
        {isLogged ? 
          <div className="createPost">
            <div className="createPost-container">
              <p className="createPost-caption">Join the conversation</p>
              <div className="createPost-button" onClick={createPostPage}>
                <FaPlus className="createPost-plus"/>
                <p className="createPost-button-caption">Create Post</p>
              </div>
            </div>
          </div> :
        ""
        
        }

        <div className="postModule-container">
          {
            posts.map(post => 
              <PostModule
                postAuthor        = {post.forumPostAuthor}
                postBody          = {post.forumPostBody}
                postCategory      = {post.forumPostCategory}
                postDate          = {post.forumPostDate}
                postTitle         = {post.forumPostTitle}
                postUpvote        = {post.postUpVotes}
                postDownvote      = {post.postDownVotes}
                postCommentLength = {post.forumComments.length}
                postID            = {post._id}
                key               = {post._id}
              />
            )
          }
        </div>

        
      </div>

      
    </div>
  )
}