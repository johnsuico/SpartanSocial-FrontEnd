// React depencies for app to work
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Master CSS
import "./App.css";

// Import Page Components
import Landing from "./Components/Landing/landing";
import Login from './Components/Login/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />}>    </Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />}> </Route>
      </Routes>
    </Router> 
  )
}

export default App;
