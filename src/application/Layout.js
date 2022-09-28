import { Outlet, Link } from "react-router-dom";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Logo from "./justify.png";


const Layout = ({ user, imagen }) => {
  const salir = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <nav id="nav" className="uk-flex uk-flex-around uk-flex-middle nav">
        <Link to="/">
          {" "}
          <img className="uk-border-circle uk-width-auto" src={imagen} />
        </Link>

        {/* <img width="50px" src={Logo} /> */}

        <Link to="/blogs">{user}</Link>

        <button onClick={salir} class="btn-glitch-fill">
          <span class="text">// Logout</span>
          <span class="text-decoration">_</span>
          <span class="decoration">&rArr;</span>
        </button>
      </nav>

      <button
        style={{ border: "none" }}
        class="uk-button uk-padding uk-button-default uk-margin-small-right menu"
        type="button"
        uk-toggle="target: #offcanvas-nav-primary"
      >
        <img src={Logo} />
      </button>

      <div id="offcanvas-nav-primary" uk-offcanvas="overlay: true">
        <div class="uk-offcanvas-bar uk-flex uk-flex-column uk-flex-middle ">
          <Link to="/">
            <img className="uk-border-circle uk-width-auto" src={imagen} />
          </Link>

          <Link to="/blogs">{user}</Link>

          <button
            style={{ marginTop: "60px" }}
            onClick={salir}
            class="btn-glitch-fill"
          >
            <span class="text">// Logout</span>
            <span class="text-decoration">_</span>
            <span class="decoration">&rArr;</span>
          </button>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
