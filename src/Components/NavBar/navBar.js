import React, {useEffect, useState} from "react";

import LoggedNavbar from './loggedNavBar.js';
import UnloggedNavbar from './unLoggedNavBar.js';

export default function Navbar() {

  let userInStorage = JSON.parse(localStorage.getItem('user'));

  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState(userInStorage);

  useEffect(() => {
    if(localStorage.getItem('user')) {
      setLogged(true);
    } else {
      setLogged(false);
      setUser('');
    }
  })

  if (isLogged) return <LoggedNavbar userID={user.user_id}/>
  else return <UnloggedNavbar active="forums"/>
}