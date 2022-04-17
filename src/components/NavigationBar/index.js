import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LogoutUser } from "../../actions/auth-actions.js";
import { GetUser } from "../../actions/user-actions.js";

const NavigationBar = ({ currScreen }) => {
  const loggedInUser = useSelector((state) => state.userReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    GetUser(dispatch);
    if (loggedInUser._id) {
      localStorage.setItem("role", loggedInUser.userRole);
      localStorage.setItem("uid", loggedInUser._id);
    }
  }, [dispatch]);

  const clearUser = () => {
    LogoutUser(dispatch);
    navigate("/login");
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

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                RECIPES
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                <li className="dropdown-item">
                  <Link
                    to="/search"
                    className={`nav-link ${
                      currScreen === "SEARCH" ? "active" : ""
                    }`}
                  >
                    SEARCH
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link
                    to="/recipe-reviews"
                    className={`nav-link ${
                      currScreen === "RECIPEREVS" ? "active" : ""
                    }`}
                  >
                    RECIPE REVIEWS
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                PROFILE
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                {loggedInUser && (
                  <li className="dropdown-item">
                    <Link
                      to="/profile"
                      className={`nav-link ${
                        currScreen === "PROFILE" ? "active" : ""
                      }`}
                    >
                      MY PROFILE
                    </Link>
                  </li>
                )}
                <li className="dropdown-item">
                  <Link
                    to="/users"
                    className={`nav-link ${
                      currScreen === "USERS" ? "active" : ""
                    }`}
                  >
                    ALL USERS
                  </Link>
                </li>
              </ul>
            </li>

            {/* Fitness Links */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                PLANS
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                <li className="dropdown-item">
                  <Link
                    to="/workoutplans"
                    className={`nav-link ${
                      currScreen === "WORKOUTPLAN" ? "active" : ""
                    }`}
                  >
                    WORKOUT PLANS
                  </Link>
                </li>

                <li className="dropdown-item">
                  <Link
                    to="/mealplans"
                    className={`nav-link ${
                      currScreen === "MEALPLAN" ? "active" : ""
                    }`}
                  >
                    MEAL PLANS
                  </Link>
                </li>
              </ul>
            </li>

            {loggedInUser && loggedInUser.userRole === "client" && (
              <li className="nav-item">
                <Link
                  to="/workout-log"
                  className={`nav-link ${
                    currScreen === "TRACKWORKOUT" ? "active" : ""
                  }`}
                >
                  WORKOUT LOG
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
              {/* <button className="btn btn-danger ms-2 me-2" onClick={clearUser}>
                Logout
              </button> */}
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
