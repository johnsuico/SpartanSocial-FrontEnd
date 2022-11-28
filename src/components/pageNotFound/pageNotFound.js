import React from 'react';

// Import CSS
import './pageNotFound.css';

// Import Components
import Navbar from '../navbar/navbar';

export default function pageNotFound() {
  return (
    <div className="pageNotFound-container">
      <Navbar active="" />

      <div className="pageNotFound-content">
        <h1 className="pageNotFound-title">404 Page Not Found</h1>
        <p className="pageNotFound-caption">This page may have been deleted, or never existed in the first place.</p>
      </div>
    </div>
  )
}