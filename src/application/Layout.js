import { Outlet,Link } from "react-router-dom";
import React from 'react';
import { getAuth, signOut } from "firebase/auth";

const Layout = ({user,imagen}) => {
  const salir = () =>{
    

const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
  }
  return (
    <>
      <nav>
        <ul>
        <li>
            <img className="uk-border-circle" src={imagen} />
          </li>
          <li>
            <Link to="/blogs">Home</Link>
          </li>
          <li>
          <Link to="/">{user}</Link>
          </li>
          <li>
          <button onClick={salir} class="btn-glitch-fill">
            <span class="text">// Logout</span>
            <span class="text-decoration">_</span>
            <span class="decoration">&rArr;</span>
          </button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;