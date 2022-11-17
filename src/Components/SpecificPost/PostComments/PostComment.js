import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

// Importing CSS
import './PostComment.css';

// Importing icons
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function PostComment(props) {

  // Grab stored user in local storage.
  const userInStorage = JSON.parse(localStorage.getItem('user'));

  const [author, setAuthor] = useState({});
  const [userID, setUserID] = useState('');
  const [isLogged, setLogged] = useState(false);

  const navigate = useNavigate();

  // Variables to hold if user has already voted on comment
  const [upvoteComment, setUpvoteComment] = useState(false);
  const [downvoteComment, setDownvoteComment] = useState(false);

  // Variables to hold vote counters
  const [upCountComment, setUpcountComment] = useState(props.commentUpvotes);
  const [downCountComment, setDowncountComment] = useState(props.commentDownvotes);

  const date = new Date(props.commentDate);
  const commentDate = date.toDateString();

  useEffect(() => {
    // Grab author details
    Axios.get(`https://spartansocial-api.herokuapp.com/users/${props.commentAuthor}`)
      .then(res => {
        setAuthor(res.data);
      })
      .catch (err => {
        console.log(err);
      })

      // Grab user info if logged in
      if (localStorage.getItem('user')) {
        setUserID(userInStorage.user_id);
        setLogged(true);

        Axios.get(`https://spartansocial-api.herokuapp.com/users/${userID}`)
          .then (res => {
            if (res.data.upvotedComments === undefined) {
              // Do nothing and wait until it loads
            } else {
              if (res.data.upvotedComments.includes(props.commentID)) {
                setUpvoteComment(true);
              }

              if (res.data.downvotedComments.includes(props.commentID)) {
                setDownvoteComment(true);
              }
            }
          })
          .catch(err => console.log(err));
      }
  })

  function addCommentUpvote() {
    if (isLogged) {
      Axios.post(`https://spartansocial-api.herokuapp.com/comments/${props.postID}/${props.commentID}/upvote`, {userID})
      setUpvoteComment(true);
      setUpcountComment(upCountComment+1);
    } else {
      navigate(`/login`);
    }
  }

  function removeCommentUpvote() {
    if (isLogged) {
      Axios.delete(`https://spartansocial-api.herokuapp.com/comments/${props.postID}/${props.commentID}/upvote`, {data: {userID}})
      setUpvoteComment(false);
      setUpcountComment(upCountComment-1);
    } else {
      navigate(`/login`);
    }
  }

  function addCommentDownvote() {
    if (isLogged) {
      Axios.post(`https://spartansocial-api.herokuapp.com/comments/${props.postID}/${props.commentID}downpvote`, {userID})
      setDownvoteComment(true);
      setDowncountComment(downCountComment-1);
    } else {
      navigate(`/login`);
    }
  }

  function removeCommentDownvote() {
    if (isLogged) {
      Axios.delete(`https://spartansocial-api.herokuapp.com/comments/${props.postID}/${props.commentID}/downvote`, {data: {userID}})
      setDownvoteComment(false);
      setDowncountComment(downCountComment+1);
    } else {
      navigate(`/login`);
    }
  }

  function commentUpvoteClick() {
    if (!upvoteComment && !downvoteComment) {
      addCommentUpvote();
    } else if (!upvoteComment && downvoteComment) {
      addCommentUpvote();
      removeCommentDownvote();
    } else {
      removeCommentUpvote();
    }
  }

  function commentDownvoteClick() {
    if (!downvoteComment && !upvoteComment) {
      addCommentDownvote();
    } else if (!downvoteComment && upvoteComment) {
      addCommentDownvote();
      removeCommentUpvote();
    } else {
      removeCommentDownvote();
    }
  }

  return (
    <div className="postComment-container">
      <div className="postComment-content-container">
        <div className="comment-header-container">
          <div className="default-profile-pic-small"></div>
          <div className="author-date-container">
            <p className="commentAuthor">{author.firstName} {author.lastName}</p>
            <p className="commentDate">{commentDate}</p>
          </div>
        </div>
        <div className="comment-body-container">
          <p className="comment-body-content">{props.commentBody}</p>
        </div>
        <div className="comment-footer">
          <div className="voteCounter-container">
            <div className={`vote-container ` + (upvoteComment ? `upvote-active` : `upvote`)} onClick={commentUpvoteClick}>
              <FaArrowUp className="upvote-arrow"/>
              <p className="vote-count">{upCountComment}</p>
            </div>
            <div className={`vote-container ` + (downvoteComment ? `downvote-active` : `downvote`)} onClick={commentDownvoteClick}>
                <FaArrowDown className="downvote-arrow"/>
                <p className="vote-count">{downCountComment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}