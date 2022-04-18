import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import HomeScreen from "../HomeScreen";

import { RegisterUser } from "../../actions/auth-actions";
import { GetUser } from "../../actions/user-actions";

const RegisterScreen = () => {
  const loggedInUser = useSelector((state) => state.userReducer);
  const [user, setUser] = useState({
    userRole: "client",
    userGender: "female",
  });
  const [validPW, setValidPW] = useState(false);
  const [readPrivPol, setRead] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "userTypeRadio") {
      setUser({
        ...user,
        userRole: event.target.id,
      });
    } else if (name === "userGenderRadio") {
      setUser({
        ...user,
        userGender: event.target.id,
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
    let profImage;

    if (user.userGender === "male") {
      profImage = "../images/avatars/profilemale1.jpg";
    } else {
      profImage = "../images/avatars/femaleProfimg.png";
    }

    const newUser = {
      ...user,
      userProfImgLink: profImage,
    };

    if (validPW && newUser.username && newUser.email) {
      RegisterUser(dispatch, newUser).then(() => {
        navigate("/home");
      });
    } else {
      alert("There were some problems with registering.");
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
            <div>Gender:</div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="userGenderRadio"
                id="female"
                defaultChecked
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              ></input>
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="userGenderRadio"
                id="male"
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              ></input>
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
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
            {/* Privacy policy agreement */}
            <div data-bs-toggle="modal" data-bs-target="#privacyModal">
              You must read the privacy policy to register.
              <span>
                <button className="btn btn-info ms-2">Privacy Policy</button>
              </span>
            </div>

            <div class="modal fade" id="privacyModal" tabindex="-1">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Privacy Policy</h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <h3>What Data Is Collected?</h3>
                    <p>
                      The information SwoleMate collects is dependent on your
                      role. There are 3 roles, Client, Trainer, Nutritionist.
                      For every role, we collect your username, password, and
                      email. We also collect your first and last name, date of
                      birth, and phone number. We collect your weight and
                      height. We collect your workout habits along with any meal
                      plans or workout plans created.
                    </p>
                    <h3>Why Do We Collect This Data?</h3>
                    <p>
                      We want to provide personalized training and meal plans
                      for your fitness goals as well as targeted fitness
                      advertisements that pertain to your goals.
                    </p>
                    <h3>How Will It Be Used?</h3>
                    <p>
                      This data is for internal use only and we will never sell
                      or give away your data. It is for internal analytics to
                      provide the best client/trainer/nutritionist relationships
                      as well as to give the best possible user interface
                      interactions.
                    </p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={() => setRead(true)}
                    >
                      I Understand
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-grid">
              {readPrivPol && (
                <button onClick={registerBtn} className="btn btn-primary mt-2">
                  Register
                </button>
              )}
              {!readPrivPol && (
                <button
                  onClick={registerBtn}
                  className="btn btn-primary mt-2"
                  disabled
                >
                  Register
                </button>
              )}
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
