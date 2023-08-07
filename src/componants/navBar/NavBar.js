import React, { useEffect, useState } from "react";
import "./navbar.css";
import Cookies from "js-cookie";

function NavBar() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);
  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light nav">
        <div className="container-fluid ">
          <a className="navbar-brand" href="/">
            Hungrezy
          </a>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/add-restaurant">
                  Add restuarant
                </a>
              </li>
              {auth ? (
                <li className="nav-item">
                  <a className="nav-link" href="/user-profile">
                    Profile
                  </a>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      signUp
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
