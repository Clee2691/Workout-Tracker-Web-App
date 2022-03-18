import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = ({ currScreen }) => {
  let loggedIn = true; // TODO: Change to use state
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container-fluid ms-2 me-2">
        <Link to="/" className="navbar-brand">
          SwoleMate
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                to="/home"
                className={`nav-link ${currScreen === "HOME" ? "active" : ""}`}
              >
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search"
                className={`nav-link ${
                  currScreen === "SEARCH" ? "active" : ""
                }`}
              >
                SEARCH
              </Link>
            </li>
            {loggedIn && (
              <li className="nav-item">
                <Link
                  to="/profile"
                  className={`nav-link ${
                    currScreen === "PROFILE" ? "active" : ""
                  }`}
                >
                  PROFILE
                </Link>
              </li>
            )}
            {loggedIn && (
              <li className="nav-item">
                <Link
                  to="/workout-log"
                  className={`nav-link ${
                    currScreen === "TRACKWORKOUT" ? "active" : ""
                  }`}
                >
                  WORKOUT
                </Link>
              </li>
            )}
          </ul>
          {!loggedIn && (
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-success me-2">
                LOGIN
              </Link>
              <Link to="/register" className="btn btn-outline-danger">
                SIGN UP
              </Link>
            </div>
          )}
          {loggedIn && (
            <div className="d-flex">
              <h4 className="mb-0 align-self-center me-1">Welcome Calvin!</h4>
              <img
                className="img-fluid rounded-circle"
                src="../images/avatars/maleprof2.jpg"
                width="48px"
              ></img>
            </div>
          )}
        </div>

        <button
          className="navbar-toggler mt-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
