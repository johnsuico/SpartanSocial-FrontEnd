// React depencies for app to work
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Master CSS
import "./App.css";

// Import Page Components
import Landing from "./Components/Landing/landing";
import Login from './Components/Login-Create/Login/login';
import CreateAccount from './Components/Login-Create/CreateAccount/createAccount';
import CreateAccount2 from './Components/Login-Create/CreateAccount/accountInfo';
import CreateAccount3 from './Components/Login-Create/CreateAccount/accountOptInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />}>    </Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />}> </Route>
      </Routes>
      <Routes>
        <Route path="/createAccount" element={<CreateAccount />}> </Route>
      </Routes>
      <Routes>
        <Route path="/createAccount/:id/cp2" element={<CreateAccount2 />}> </Route>
      </Routes>
      <Routes>
        <Route path="/createAccount/:id/cp3" element={<CreateAccount3 />}> </Route>
      </Routes>
    </Router> 
  )
}

export default App;
