import React, {useEffect, useState} from "react";

import LoggedNavbar from './loggedNavBar.js';
import UnloggedNavbar from './unLoggedNavBar.js';

export default function Navbar(props) {

  // Grab the user's data from local storage, if they are logged in.
  let userInStorage = JSON.parse(localStorage.getItem('user'));

  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState(userInStorage);

  useEffect(() => {
    // Check if the user is logged in.
    if(localStorage.getItem('user')) {
      setLogged(true);
    } else {
      setLogged(false);
      setUser('');
    }
  }, [])

  // If the user is logged in, show the navbar version with extra information.
  if (isLogged) return <LoggedNavbar userID={user.user_id} active={props.active}/>
  // If NOT logged in, show the navbar that has less information (profile page, log out button).
  else return <UnloggedNavbar active={props.active}/>
}