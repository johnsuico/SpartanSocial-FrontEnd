// React depencies for app to work
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Master CSS
import "./App.css";

// Import Page Components
import Landing from "./Components/Landing/landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}>    </Route>
      </Routes>
    </Router> 
  )
}

export default App;
