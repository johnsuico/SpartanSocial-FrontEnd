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

  const [author, setAuthor] = useState({});
  const [userID, setUserID] = useState('');
  const [isLogged, setLogged] = useState(false);

  const navigate = useNavigate();

  // Variables to hold if user has already voted on post
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

  // Variables to hold vote counters
  const [upCount, setUpcount] = useState(props.postUpvote);
  const [downCount, setDowncount] = useState(props.postDownvote);

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

      Axios.get(`https://spartansocial-api.herokuapp.com/users/${userID}`)
        .then (res => {
          if (res.data[0].upvotedPosts.includes(props.postID)) {
            setUpvote(true);
          } else {
            setUpvote(false);
          }

          if (res.data[0].downvotedPosts.includes(props.postID)) {
            setDownvote(true);
          } else {
            setDownvote(false);
          }
        })
        .catch (err => console.log(err));
    } 
  }, [])

  let date = new Date(props.postDate);
  const postDate = date.toDateString();

  function addUpvote() {
    if (isLogged) {
      Axios.post(`https://spartansocial-api.herokuapp.com/forums/posts/${props.postID}/upvote`, {userID});
      setUpvote(!upvote);
      setUpcount(upCount+1);
    } else {
      navigate(`/login`);
    }
  }

  function removeUpvote() {
    if (isLogged) {
      Axios.delete(`https://spartansocial-api.herokuapp.com/forums/posts/${props.postID}/upvote`, {data: {userID}})
      setUpvote(!upvote);
      setUpcount(upCount-1);
    } else {
      navigate(`/login`);
    }
  }

  function addDownvote() {
    if (isLogged) {
      Axios.post(`https://spartansocial-api.herokuapp.com/forums/posts/${props.postID}/downvote`, {userID});
      setDownvote(true);
      setDowncount(downCount-1);
    } else {
      navigate(`/login`);
    }
  }

  function removeDownvote() {
    if (isLogged) {
      Axios.delete(`https://spartansocial-api.herokuapp.com/forums/posts/${props.postID}/downvote`, {data: {userID}})
      setDownvote(false);
      setDowncount(downCount+1);
    } else {
      navigate(`/login`);
    }
  }

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

  return (
    <div className="post-container">
      <div className="post-content">
        <Link to={`/${parentForumId}/${subForumId}/${props.postID}`} className="post-link">
          <h2 className="postTitle">{props.postTitle}</h2>
        </Link> 
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