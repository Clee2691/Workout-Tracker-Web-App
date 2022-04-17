import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { LoginUser } from "../../actions/auth-actions";

import NavigationBar from "../NavigationBar";
import HomeScreen from "../HomeScreen"
import { GetUser } from "../../actions/user-actions";


const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.userReducer);

  const [user, setUser] = useState({});
  const [loginError, setError] = useState({});

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginBtn = () => {
    LoginUser(dispatch, user)
      .then(() => {
        navigate("/home");
      })
      .catch((e) => {
        if (e.response.status === 403) {
          setError({ errPW: "Wrong Password Try Again!" });
        } else {
          setError({ errUser: "No user found with that username!" });
        }
      });
  };

  useEffect(() => {
    GetUser(dispatch);
  }, [dispatch]);

  if (loggedInUser) {
    return <HomeScreen/>
  } else {

  return (
    <>
      <NavigationBar />

      <div className="container col-sm-9 col-md-6 col-lg-5 col-xl-4 mt-5 border p-4 border-secondary">
        <h1 className="text-center">Login</h1>
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
              placeholder="Username"
              name="username"
            />
            {loginError.errUser && (
              <div className="text-danger">{loginError.errUser}</div>
            )}
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
            {loginError.errPW && (
              <div className="text-danger">{loginError.errPW}</div>
            )}
          </div>
          <div className="d-grid">
            <button onClick={loginBtn} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
        <label className="mt-2 ms-3">Need an Account?</label>{" "}
        <Link to="/register" className="mt-0 text-decoration-none">
          Signup now!
        </Link>{" "}
        It's free!
      </div>
      <footer className="text-center mb-2">
        &copy; Calvin Lee 2022 - <a href="/privacypol">Privacy Policy</a>
      </footer>
    </>
  );
  }
};

export default LoginScreen;
