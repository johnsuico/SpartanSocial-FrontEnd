import React, {useEffect, useState} from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

// Importing CSS
import './PostModule.css';

// Importing Icons
import { IoChatbubbleSharp } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// Importing Category Components
import Category from '../postCategories/Category';

export default function PostPage(props) {

  // Grab stored user in local storage.
  let userInStorage = JSON.parse(localStorage.getItem('user'));

  // Variables to store data.
  const [author, setAuthor] = useState({});
  const [userID, setUserID] = useState('');
  const [isLogged, setLogged] = useState(false);

  // Used to redirect users.
  const navigate = useNavigate();

  // Variables to hold if user has already voted on post
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

  // Variables to hold vote counters
  const [upCount, setUpcount] = useState(props.postUpvote);
  const [downCount, setDowncount] = useState(props.postDownvote);

  // Varible to hold the parentForumID
  let {parentForumId, subForumId} = useParams();

  useEffect(() => {

    // Grab author details
    Axios.get(`https://spartansocial-api.herokuapp.com/users/${props.postAuthor}`)
    .then (res => {
      setAuthor(res.data);
    })
    .catch (err => {
      console.log(err);
    })

    // Grab user info if logged in
    if(localStorage.getItem('user')) {

      setUserID(userInStorage.user_id);
      setLogged(true);
      
      // Grab user data.
      Axios.get(`https://spartansocial-api.herokuapp.com/users/${userID}`)
        .then (res => {
          // Check if the post has already been upvoted by user.
          if (res.data[0].upvotedPosts.includes(props.postID)) {
            setUpvote(true);
          } else {
            setUpvote(false);
          }
          
          // Check if the post has already been downvoted by user.
          if (res.data[0].downvotedPosts.includes(props.postID)) {
            setDownvote(true);
          } else {
            setDownvote(false);
          }
        })
        .catch (err => console.log(err));
    } 
  }, [])

  // Takes the date and parses it into something the webpage can display and the user can easily read.
  let date = new Date(props.postDate);
  const postDate = date.toDateString();

  // Upvote function to add an upvote, incrementing the upvote counter by 1.
  function addUpvote() {
    if (isLogged) {
      Axios.post(`https://spartansocial-api.herokuapp.com/forums/posts/${props.postID}/upvote`, {userID});
      setUpvote(!upvote);
      setUpcount(upCount+1);
    } else {
      navigate(`/login`);
    }
  }

  // Remove upvote function to remove an upvote, decrementing the upvote counter by -1.
  function removeUpvote() {
    if (isLogged) {
      Axios.delete(`https://spartansocial-api.herokuapp.com/forums/posts/${props.postID}/upvote`, {data: {userID}})
      setUpvote(!upvote);
      setUpcount(upCount-1);
    } else {
      navigate(`/login`);
    }
  }

  // Add a downvote, decrements the downvote counter by -1.
  function addDownvote() {
    if (isLogged) {
      Axios.post(`https://spartansocial-api.herokuapp.com/forums/posts/${props.postID}/downvote`, {userID});
      setDownvote(true);
      setDowncount(downCount-1);
    } else {
      navigate(`/login`);
    }
  }

  // Removes a downvote, increments the upvote counter by 1.
  function removeDownvote() {
    if (isLogged) {
      Axios.delete(`https://spartansocial-api.herokuapp.com/forums/posts/${props.postID}/downvote`, {data: {userID}})
      setDownvote(false);
      setDowncount(downCount+1);
    } else {
      navigate(`/login`);
    }
  }

  // Logic that handles the current state of upvoting and increments or decrements accordingly.
  function upvoteClick() {
    if (!upvote && !downvote) {
      addUpvote();
    } else if (!upvote && downvote) {
      addUpvote();
      removeDownvote();
    } else {
      removeUpvote();
    }
  }

  // Logic that handles the current state of downvoting and increments or decrements accordingly.
  function downvoteClick() {
    if (!downvote && !upvote) {
      addDownvote();
    } else if (!downvote && upvote) {
      addDownvote();
      removeUpvote();
    } else {
      removeDownvote();
    }
  }

  // Function delete a post from the database.
  function deletePost() {
    Axios.delete(`https://spartansocial-api.herokuapp.com/forums/posts/${props.postID}`)
      .then (() => {
       console.log('Deleted Post');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="post-container">
      <div className="post-content">
        <div className="post-content-header-title-container">
          <Link to={`/${parentForumId}/${subForumId}/${props.postID}`} className="post-link">
            <h2 className="postTitle">{props.postTitle}</h2>
          </Link>
          {userID === author._id ?
            <div className="deletePost-container">
              <p className="deletePost" onClick={deletePost}>Delete Post</p>
            </div>
          :
            null
          }
        </div>
          <div className="postHeader-info-container">
            <div className="postAuthor-container">
              <div className="default-profile-pic"></div>
              <Link to={`/profilePage/${author._id}`} className="profileLink">
              <div className="author-date-container">
                <p className="postAuthor profileLink">{author.firstName} {author.lastName}</p>
                <p className="postDate">{postDate}</p>
              </div>
              </Link>
            </div>
            <Link to={`/${parentForumId}/${subForumId}/${props.postID}`} className="post-link">
              <div className="category">
                <Category category={props.postCategory} />
              </div>
            </Link>
          </div>
          <Link to={`/${parentForumId}/${subForumId}/${props.postID}`} className="post-link">
            <div className="postBody-container">
              <p className="postBody">{props.postBody}</p>
            </div>
          </Link>
        <div className="postFooter-container">
          <div className="commentCounter-container">
            <IoChatbubbleSharp className="comment-icon" />
            <p className="comment-counter">{props.postCommentLength}</p>
          </div>
          <div className="voteCounter-container">
            <div className={`vote-container ` + (upvote ? `upvote-active` : `upvote`)} onClick={upvoteClick}>
              <FaArrowUp className="upvote-arrow"/>
              <p className="vote-count">{upCount}</p>
            </div>
            <div className={`vote-container ` + (downvote ? `downvote-active` : `downvote`)} onClick={downvoteClick}>
              <FaArrowDown className="downvote-arrow"/>
              <p className="vote-count">{downCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}