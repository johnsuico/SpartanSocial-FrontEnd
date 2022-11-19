import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import Axios from 'axios';

// Importing CSS
import './Post.css';

// Importing Components
import Navbar from '../Navbar/navbar';
import PostModule from '../PostModule/PostModule';
import PostComment from './PostComments/PostComment';

export default function SpecificPost() {

  const {postId} = useParams();

  const [post, setPost] = useState({});
  const [commentPostLength, setPostCommentLength] = useState(0);
  const [commentArray, setCommentArray] = useState([]);
  const [newComment, setNewComment] = useState('');

  const userInStorage = JSON.parse(localStorage.getItem('user'));
  const [userID, setUserID] = useState('');

  useEffect(() => {
    // Get post details
    Axios.get(`https://spartansocial-api.herokuapp.com/forums/posts/${postId}`)
      .then (res => {
        setPost(res.data);
        setPostCommentLength(res.data.forumComments.length);
      })
      .catch (err => {
        console.log(err);
      })

    Axios.get(`https://spartansocial-api.herokuapp.com/comments/${postId}`)
      .then (res => {
        setCommentArray(res.data);
      })
      .catch (err => {
        console.log(err);
      })

      if (userInStorage) {
        setUserID(userInStorage.user_id);
      }
  }, [])
  
  function handleSubmit(e) {
    e.preventDefault();

    const sendComment = {
      commentAuthor: userID,
      commentBody: newComment
    };

    Axios.post(`https://spartansocial-api.herokuapp.com/comments/${postId}`, sendComment)
      .then()
      .catch(err => console.log(err));

  }

  function onChangeComment(e) {
    setNewComment(e.target.value);
  }

  return (
    <div>
      <Navbar active="forums"/>  

      <div className="specific-post-page">
        <div className="specific-post-container">

        {/* If you don't check if it's undefined, the API will crash as it tries to check for something that doesn't exists. */}
        {
          post.forumPostAuthor === undefined 
          ?
          null
          :
          <PostModule
            postAuthor        = {post.forumPostAuthor}
            postBody          = {post.forumPostBody}
            postCategory      = {post.forumPostCategory}
            postDate          = {post.forumPostDate}
            postTitle         = {post.forumPostTitle}
            postUpvote        = {post.postUpVotes}
            postDownvote      = {post.postDownVotes}
            postCommentLength = {commentPostLength}
            postID            = {post._id}
            key               = {post._id}
          />
        }
        </div>

        <h2 className="commentSection-title">Comments:</h2>

        <div className="post-comment-form-container">
          <form className="createComment-form" onSubmit={handleSubmit}>
            <label className="createComment-label">Add a comment:</label>
            <textarea cols="30" rows="3" className="createComment-field" onChange={onChangeComment} value={newComment}></textarea>

            <div className="createComment-submit-btn-container">
              <button className="createComment-submit-btn">Add comment</button>
            </div>
          </form>
        </div>

        <div className="post-comment-container">
          {
            commentArray === undefined ? null :
            commentArray.map(comment => 
                <PostComment
                  commentAuthor     = {comment.commentAuthor}
                  commentBody       = {comment.commentBody}
                  commentDate       = {comment.commentDate}
                  commentUpvotes    = {comment.commentUpvotes}
                  commentDownvotes  = {comment.commentDownvotes}
                  parentPost        = {comment.parentPost}
                  commentID         = {comment._id}
                  key               = {comment._id}
                />
              )
          }
        </div>
      </div>
    </div>
  )
}