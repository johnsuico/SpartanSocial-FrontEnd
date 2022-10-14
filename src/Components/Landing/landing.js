import React from "react";
import { Link } from "react-router-dom";

// Importing CSS
import './landing.css';

// Importing Components
import Navbar from '../Navbar/navbar';

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-container">
        <Navbar />
      </div>
    </div>
  )
}