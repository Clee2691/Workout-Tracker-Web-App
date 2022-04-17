import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import HomeScreen from "../HomeScreen";

import { RegisterUser } from "../../actions/auth-actions";
import { GetUser } from "../../actions/user-actions";

const RegisterScreen = () => {
  const loggedInUser= useSelector(state => state.userReducer);
  const [user, setUser] = useState({"userRole":"client"});
  const [validPW, setValidPW] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "userTypeRadio") {
      setUser({
        ...user,
        "userRole": event.target.id,
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const validatePW = (event) => {
    const confirmPW = event.target.value;
    if (user.password === confirmPW) {
      setValidPW(true);
    }
  };

  const registerBtn = () => {
    if (validPW && user.username && user.email) {
      RegisterUser(dispatch, user).then(() => {
        navigate("/home");
      });
    } else {
      console.log("Need more info");
    }
  };

  useEffect(() => {
    GetUser(dispatch);
  }, [dispatch]);

  if (loggedInUser) {
    return <HomeScreen />;
  } else {
    return (
      <>
        <NavigationBar />

        <div className="container col-sm-9 col-md-7 col-lg-6 col-xl-5 mt-4 border p-4 border-secondary">
          <h1 className="text-center">Sign Up</h1>
          <div className="ps-3 pe-3">
            <div className="mt-2">
              <label className="form-label" htmlFor="username-input">
                Username
              </label>
              <input
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
                className="form-control"
                type="text"
                id="username-input"
                placeholder="Username..."
                name="username"
              />
            </div>

            <div className="mt-2">
              <label className="form-label" htmlFor="email-input">
                Email
              </label>
              <input
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
                className="form-control"
                type="email"
                id="email-input"
                placeholder="Email..."
                name="email"
              />
            </div>

            <div className="mt-2 mb-2">
              <label className="form-label" htmlFor="password-input">
                Password
              </label>
              <input
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
                className="form-control"
                type="password"
                id="password-input"
                placeholder="Password..."
                name="password"
              />
            </div>
            <div className="mt-2 mb-2">
              <label className="form-label" htmlFor="confirm-pw-input">
                Confirm Password
              </label>
              <input
                onChange={(e) => {
                  validatePW(e);
                }}
                className="form-control"
                type="password"
                id="confirm-pw-input"
                placeholder="Confirm Password..."
              />
            </div>
            <div>Sign Up As:</div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="userTypeRadio"
                id="client"
                defaultChecked
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              ></input>
              <label className="form-check-label" htmlFor="client">
                Client
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="userTypeRadio"
                id="trainer"
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              ></input>
              <label className="form-check-label" htmlFor="trainer">
                Trainer
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="userTypeRadio"
                id="nutritionist"
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              ></input>
              <label className="form-check-label" htmlFor="nutritionist">
                Nutritionist
              </label>
            </div>

            <div className="d-grid">
              <button onClick={registerBtn} className="btn btn-primary mt-2">
                Register
              </button>
            </div>
          </div>
          <label className="mt-2 ms-3">Already registered?</label>{" "}
          <Link to="/login" className="mt-0 text-decoration-none">
            Login Here!
          </Link>
        </div>
        <footer className="text-center mb-2">
          &copy; Calvin Lee 2022 -
          <Link to="/privacypol" className="text-decoration-none">
            <span className="ms-2">Privacy Policy</span>
          </Link>
        </footer>
      </>
    );
  }
};

export default RegisterScreen;
