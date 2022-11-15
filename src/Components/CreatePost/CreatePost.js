import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Axios from 'axios';

// Importing CSS
import './CreatePost.css';

// Importing Navbar
import Navbar from '../Navbar/navbar';

// Importing category buttons
import Category from '../PostCategories/Category';

export default function CreatePost() {

  const userInStorage = JSON.parse(localStorage.getItem('user'));

  const [forumPostTitle, setPostTitle] = useState('');
  const [forumPostCategory, setCategory] = useState('');
  const [forumPostBody, setPostBody] = useState('');
  const [forumPostAuthor] = useState(userInStorage.user_id);

  const {parentForumId, subForumId} = useParams();
  const navigate = useNavigate();

  function handleChange(e) {
    const {name, value} = e.target;

    switch (name) {
      case "postTitle":
        setPostTitle(value);
        break;
      case "postBody":
        setPostBody(value);
        break;
      default:
        // No default
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPost = {
      forumPostTitle,
      forumPostCategory,
      forumPostBody,
      forumPostAuthor
    }

    Axios.post(`https://spartansocial-api.herokuapp.com/forums/subForum/${subForumId}/post`, newPost);

    navigate(`/${parentForumId}/${subForumId}`);
  }

  function clickQuestion() {
    setCategory('Question');
    if (forumPostCategory === 'Question') {
      setCategory('');
    }
  }

  function clickInformation() {
    setCategory('Information');
    if (forumPostCategory === 'Information') {
      setCategory('');
    }
  }

  return (
    <div className="createPost-page">
      <Navbar active="forums"/>
      <div className="createPost-container-form">
        <form className="createPost-form" onSubmit={handleSubmit}>
          <h2 className="post-form-title">Create post</h2>

          <div className="post-form-field">
            <label className="post-form-label">Post Title*</label>
            <input type="text" name="postTitle" className="post-form-input" onChange={handleChange} value={forumPostTitle}/>
          </div>

          <div className="post-form-field">
            <label className="post-form-label">Category (optional)</label>
            <div className="category-btns">
            <span className={`cat-btn ` + (forumPostCategory === 'Question' ? `cat-btn-active` : null)} onClick={clickQuestion}><Category category="Question"/></span>
            <span className={`cat-btn ` + (forumPostCategory === 'Information' ? `cat-btn-active` : null)} onClick={clickInformation}><Category category="Information"/></span>
            </div>
          </div>

          <div className="post-form-field">
            <label className="post-form-label">Post Body*</label>
            <textarea cols="30" rows="10" className="post-form-body-field" name="postBody" onChange={handleChange} value={forumPostBody}></textarea>
          </div>

          <div className="createPost-submit-container">
            <button className="createPost-submit-btn" type="submit">Add Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}