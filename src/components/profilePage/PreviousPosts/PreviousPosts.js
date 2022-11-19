import React, {useEffect, useState} from 'react';
import Axios from 'axios';

// Import CSS
import './PreviousPosts.css';

// Import components
import PostModule from '../../postModule/PostModule';

export default function PreviousPosts(props) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get(`https://spartansocial-api.herokuapp.com/users/${props.userID}/posts`)
      .then (res => {
        setPosts(res.data);
      })
      .catch (err => {
        console.log(err);
      })
  }, [])

  return (
    <div className="previousPosts-container">
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
  );
}