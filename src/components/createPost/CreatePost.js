import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Axios from 'axios';

// Importing CSS
import './CreatePost.css';

// Importing Navbar
import Navbar from '../navbar/navbar';

// Importing category buttons
import Category from '../postCategories/Category';

export default function CreatePost() {

  // Grab the stored user from local storage and place it into a variable.
  // userInStorage is the parsed JSON from localStorage.
  const userInStorage = JSON.parse(localStorage.getItem('user'));

  // React states (variables) to hold the post information.
  const [forumPostTitle, setPostTitle] = useState('');
  const [forumPostCategory, setCategory] = useState('');
  const [forumPostBody, setPostBody] = useState('');
  const [forumPostAuthor] = useState(userInStorage.user_id);
  const {parentForumId, subForumId} = useParams();

  // Assigning the navigate function from react-router-dom to another name.
  const navigate = useNavigate();

  // This function takes the input from the input fields and changes the variables accordingly.
  function handleChange(e) {
    const {name, value} = e.target;

    // Checks which input field is being used by checking the "name" of the variable.
    // Name is assigned in the HTML tag of the input field.
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

  // This function handles what happens when the user clicks the submit button.
  function handleSubmit(e) {
    // This prevents the page from reloading on submit.
    e.preventDefault();

    // A new JSON created with the variables to create a new post.
    const newPost = {
      forumPostTitle,
      forumPostCategory,
      forumPostBody,
      forumPostAuthor
    }

    // API post request to create a new post in a specific subforum. "newPost" above is the payload for this request.
    Axios.post(`https://spartansocial-api.herokuapp.com/forums/subForum/${subForumId}/post`, newPost);

    // After submitting the API post request, reroute the user back to the subforum.
    navigate(`/${parentForumId}/${subForumId}`);
  }

  // Handles the category of the new post.
  function clickQuestion() {
    setCategory('Question');
    if (forumPostCategory === 'Question') {
      setCategory('');
    }
  }

  // Handles the category of the new post.
  function clickInformation() {
    setCategory('Information');
    if (forumPostCategory === 'Information') {
      setCategory('');
    }
  }

  return (
    <div className="createPost-page">
      {/* Navbar with active tab chosen as "forums". */}
      <Navbar active="forums"/>

      {/* Start of create post. */}
      <div className="createPost-container-form">

        {/* The start of the create post form, with a submit function (handleSubmit) to be called when submit button is pressed. */}
        <form className="createPost-form" onSubmit={handleSubmit}>

          {/* Just the title of the create form. */}
          <h2 className="post-form-title">Create post</h2>

          {/* User inputted title for the post they are creating. */}
          <div className="post-form-field">
            <label className="post-form-label">Post Title*</label>
            <input type="text" name="postTitle" className="post-form-input" onChange={handleChange} value={forumPostTitle}/>
          </div>

          {/* User selected category for the post they are creating. */}
          <div className="post-form-field">
            <label className="post-form-label">Category (optional)</label>
            <div className="category-btns">
              {/* The classNames for the category selectors are determined by what category the user chooses, if any. */}
              {/* If the user chooses one, then the selected category will be active and take on a different styling to indicate to the user what category they chose. */}
              <span className={`cat-btn ` + (forumPostCategory === 'Question' ? `cat-btn-active` : null)} onClick={clickQuestion}><Category category="Question"/></span>
              <span className={`cat-btn ` + (forumPostCategory === 'Information' ? `cat-btn-active` : null)} onClick={clickInformation}><Category category="Information"/></span>
            </div>
          </div>

          {/* User inputted post content for the post they are creating. */}
          <div className="post-form-field">
            <label className="post-form-label">Post Body*</label>
            <textarea cols="30" rows="10" className="post-form-body-field" name="postBody" onChange={handleChange} value={forumPostBody}></textarea>
          </div>

          {/* Submit button for the create post form to send the form to the database. */}
          <div className="createPost-submit-container">
            <button className="createPost-submit-btn" type="submit">Add Post</button>
          </div>

        </form> {/* End of create post form */}
      </div>
    </div>
  )
}