import React from 'react';

// Import CSS
import './Category.css';

export default function Category(props) {

  // Checks what category is being chosen and returns the appropriate category.
  if (props.category === "Question") {
    return (
      <div className="category question">
        <p>{props.category}</p>
      </div>
    )
  } else if (props.category === "Information") {
    return (
      <div className="category information">
        <p>{props.category}</p>
      </div>
    )
  }
}