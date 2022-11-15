import React from 'react';

// Import CSS
import './Category.css';

export default function Category(props) {
  // return (
  //   <div className="Cat-container">
  //     <p className="Cat-body">{props.category}</p>
  //   </div>
  // )

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