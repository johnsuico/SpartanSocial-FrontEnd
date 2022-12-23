import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';

// Importing CSS
import './SubforumModule.css';

// Importing Icons
import {FaPlus} from 'react-icons/fa';

// Importing Components
import Navbar from '../navbar/navbar';
import PostModule from '../postModule/PostModule';

export default function SubforumPage() {

  // React state to hold information needed for the page.
  const [posts, setPosts] = useState([]);
  const [parentForum, setParentForum] = useState({});
  const [isLogged, setLogged] = useState(false);
  const [isPostEmpty, setPostEmpty] = useState(false);

  // Grab the subForumId from the URL parameters.
  let {subForumId} = useParams();

  // Used to redirect the user to a different page, when needed.
  const navigate = useNavigate();

  useEffect(() => {
    // Get all subforum posts
    Axios.get(process.env.REACT_APP_API_BASE_URL+`forums/subForum/${subForumId}/post`)
    .then (res => {
      if (res.data.length === 0) {
        setPostEmpty(true);
      } else {
        setPosts(res.data);
        setPostEmpty(false);
      }
    })
    .catch (err => {
      console.log(err);
    });

    // Get subforum data for title and description.
    Axios.get(process.env.REACT_APP_API_BASE_URL+`forums/subforum/${subForumId}`)
    .then (res => {
      setParentForum(res.data);
    })
    .catch (err => {
      console.log(err);
    })

    // Check if the user is logged in.
    if(localStorage.getItem('user')) {
      setLogged(true);
    } else {
      setLogged(false);
    }

  }, [posts])

  // Handles where the user is redirected based on their logged in status.
  function createPostPage() {
    if (isLogged) {
      // User is redirected to the create post form page if they are logged in.
      navigate(`/${parentForum._id}/${subForumId}/post/create`);
    } else {
      // User is redirected to the login page if they are not logged in.
      navigate(`/login`);
    }
  }

  return (
    <div className="subforum-page">
      <Navbar active="forums"/>
      <div className="subforum-page-container">
        <div className="subforum-info-container">
          <h1 className="subForumTitle">Welcome to the {parentForum.subForumTitle} subforum.</h1>
          <p className="subForumDesc">{parentForum.subForumDesc}</p>
        </div>

        {/* Create a post */}
        {/* If user is logged in, take them to post create form */}
        {/* If user is NOT logged in, take them to login page */}
        <div className="createPost">
          <div className="createPost-container">
            <p className="createPost-caption">Join the conversation</p>
            <div className="createPost-button" onClick={createPostPage}>
              <FaPlus className="createPost-plus"/>
              <p className="createPost-button-caption">Create Post</p>
            </div>
          </div>
        </div> 
        
        {/* Show different things if the subforum has no posts */}
        {isPostEmpty ? 
          <div className="noPost-container">
            <h2>No posts yet, be the first one to post.</h2>
          </div>
        :
          <div className="postModule-container">
            {
              posts.slice(0).reverse().map(post => 
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
        }
        
      </div>

      
    </div>
  )
}