// React depencies for app to work
import React from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

// Import Master CSS
import "./App.css";

// Import Page Components
import Landing from './components/landing/landing';
import Login from './components/login-Create/login/login';
import CreateAccount from './components/login-Create/createAccount/createAccount';
import CreateAccount2 from './components/login-Create/createAccount/accountInfo';
import CreateAccount3 from './components/login-Create/createAccount/accountOptInfo';
import SubforumPage from './components/subforumModule/SubforumPage';
import Post from './components/specificPost/Post';
import CreatePost from './components/createPost/CreatePost';
import EventsMainPage from './components/eventsPage/EventsMainPage';
import CreateEventPage from './components/eventsPage/CreateEventPage/CreateEventPage';
import SpecificEvent from './components/eventsPage/SpecificEventPage/SpecificEventPage';
import ProfilePage from './components/profilePage/ProfilePage';
import EditProfile from './components/profilePage/editProfile/editProfile.js';

const router = createBrowserRouter ([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/createAccount",
    element: <CreateAccount />
  },
  {
    path: "/createAccount/:id/cp2",
    element: <CreateAccount2 />
  },
  {
    path: "/createAccount/:id/cp3",
    element: <CreateAccount3 />
  },
  {
    path: "/:parentForumId/:subForumId",
    element: <SubforumPage />
  },
  {
    path: "/:parentForumId/:subForumId/post/create",
    element: <CreatePost />
  },
  {
    path: "/:parentForumId/:subForumId/:postId",
    element: <Post />
  },
  {
    path: "/events",
    element: <EventsMainPage />
  },
  {
    path: "/events/create",
    element: <CreateEventPage />
  },
  {
    path: "/events/:eventID/:eventCreatorID",
    element: <SpecificEvent />
  },
  {
    path: "/profilepage/:userID",
    element: <ProfilePage />
  },
  {
    path: "/profilepage/:userID/edit",
    element: <EditProfile />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
