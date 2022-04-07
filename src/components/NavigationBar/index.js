import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as service from "../../service/auth-service.js";
import { LogoutUser } from "../../actions/auth-actions.js";

const NavigationBar = ({ currScreen }) => {
  const [loggedInUser, setUser] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = async (isMounted, abortCont) => {
    const user = await service.profile(abortCont);
    if (isMounted) {
      setUser(user);
    } else {
      console.log("Dismounted");
    }
  };
  
  useEffect(() => {
    let isMounted = true;
    const abortCont = new AbortController();
    getUser(isMounted, abortCont);
    return () => {
      isMounted = false;
      abortCont.abort();
    };
  }, []);

  const clearUser = () => {
    LogoutUser(dispatch).then(() => {
      window.location.reload();
      navigate("/home");
    });
  };

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
            {loggedInUser && (
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
            {loggedInUser && (
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
          {!loggedInUser && (
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-success me-2">
                LOGIN
              </Link>
              <Link to="/register" className="btn btn-outline-danger">
                SIGN UP
              </Link>
            </div>
          )}
          {loggedInUser && (
            <div className="d-flex">
              <h4 className="mb-0 align-self-center me-1">
                Welcome {loggedInUser.username}
              </h4>
              <img
                className="img-fluid rounded-circle"
                src="../images/avatars/maleprof2.jpg"
                width="48px"
              ></img>
              <button className="btn btn-danger ms-2 me-2" onClick={clearUser}>
                Logout
              </button>
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
