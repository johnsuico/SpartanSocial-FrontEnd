// React depencies for app to work
import React from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

// Import Master CSS
import "./App.css";

// Import Page Components
import Landing from "./Components/Landing/landing";
import Login from './Components/Login-Create/Login/login';
import CreateAccount from './Components/Login-Create/CreateAccount/createAccount';
import CreateAccount2 from './Components/Login-Create/CreateAccount/accountInfo';
import CreateAccount3 from './Components/Login-Create/CreateAccount/accountOptInfo';

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
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
