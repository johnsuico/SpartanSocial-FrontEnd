import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Temp Landing Page</h1>
      <h3>Navigation</h3>
      <Link to="/login"> Login Page </Link> <br></br>
      <Link to="/createAccount"> Create account page </Link>
    </div>
  )
}