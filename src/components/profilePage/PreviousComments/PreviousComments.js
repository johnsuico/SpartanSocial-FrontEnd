import React, {useEffect, useState} from 'react';
import Axios from 'axios';

// Import CSS
import './PreviousComments.css';

// Import components
import  PostComment from '../../specificPost/PostComments/PostComment';

export default function PreviousComments(props) {

  // React state to hold the comment array.
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Grab all the comments that the user has created.
    Axios.get(`https://spartansocial-api.herokuapp.com/users/${props.userID}/comments`)
      .then (res => {
        setComments(res.data);
      })
      .catch (err => {
        console.log(err);
      })
  }, [comments])

  return (
    <div className="previousPosts-container">
      {
        comments.slice(0).reverse().map(comment => 
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
  );
}