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
import PageNotFound from './components/pageNotFound/pageNotFound';

const router = createBrowserRouter ([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <PageNotFound />
  },
  {
    path: "/createAccount",
    element: <CreateAccount />,
    errorElement: <PageNotFound />
  },
  {
    path: "/createAccount/:id/cp2",
    element: <CreateAccount2 />,
    errorElement: <PageNotFound />
  },
  {
    path: "/createAccount/:id/cp3",
    element: <CreateAccount3 />,
    errorElement: <PageNotFound />
  },
  {
    path: "/:parentForumId/:subForumId",
    element: <SubforumPage />,
    errorElement: <PageNotFound />
  },
  {
    path: "/:parentForumId/:subForumId/post/create",
    element: <CreatePost />,
    errorElement: <PageNotFound />
  },
  {
    path: "/:parentForumId/:subForumId/:postId",
    element: <Post />,
    errorElement: <PageNotFound />
  },
  {
    path: "/events",
    element: <EventsMainPage />,
    errorElement: <PageNotFound />
  },
  {
    path: "/events/create",
    element: <CreateEventPage />,
    errorElement: <PageNotFound />
  },
  {
    path: "/events/:eventID/:eventCreatorID",
    element: <SpecificEvent />,
    errorElement: <PageNotFound />
  },
  {
    path: "/profilepage/:userID",
    element: <ProfilePage />,
    errorElement: <PageNotFound />
  },
  {
    path: "/profilepage/:userID/edit",
    element: <EditProfile />,
    errorElement: <PageNotFound />
  },
  {
    path: "*",
    element: <PageNotFound />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
