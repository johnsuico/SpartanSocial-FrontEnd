import React from "react";
import { Link } from "react-router-dom";

// Importing CSS
import './landing.css';

// Importing Components
import Navbar from '../Navbar/navbar';
import GeneralForum from '../GeneralForum/GeneralForum';

export default function Landing() {
  return (
    <div className="landing">
      <Navbar />
      <div className="landing-content-container">
        <GeneralForum />
      </div>
    </div>
  )
}