import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import ProfileScreen from ".";

import { GetUser, UpdateUser } from "../../actions/user-actions";

const EditProfile = ({ isEdit }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(isEdit);

  const loggedInUser = useSelector((state) => state.userReducer);
  const [newUserData, setNewUserData] = useState({
    _id: loggedInUser._id,
    sensitiveInfo: loggedInUser.sensitiveInfo,
    userStats: loggedInUser.userStats,
  });

  useEffect(() => {
    GetUser(dispatch);
  }, [dispatch]);

  const inputChangeHandler = (event) => {
    let newUser = {};
    const { name, value } = event.target;
    if (name === "weight" || name === "height") {
      newUser = {
        ...newUserData,
        userStats: { ...newUserData.userStats, [name]: value },
      };
    } else if (name === "dateOfBirth" || name === "phoneNumber") {
      newUser = {
        ...newUserData,
        sensitiveInfo: { ...newUserData.sensitiveInfo, [name]: value },
      };
    } else {
      newUser = {
        ...newUserData,
        [name]: value,
      };
    }
    setNewUserData(newUser);
  };

  const cancelEditbtn = () => {
    setEditing(false);
  };

  const saveProfileBtn = () => {
    UpdateUser(dispatch, newUserData).then(() => {
      setEditing(false);
    });
  };

  if (!editing) {
    return <ProfileScreen />;
  } else {
    return (
      <div>
        <NavigationBar />
        <div className="container border col-sm-8 col-md-6 col-lg-5 col-xl-4 mt-4 mb-4">
          <h1 className="text-center">Edit Profile</h1>
          <div className="position-relative">
            <img
              className="img-fluid rounded-circle ms-auto me-auto avatar-pic"
              src="../images/avatars/profilemale1.jpg"
            />
            <i className="fa-solid fa-camera position-absolute top-50 start-50 translate-middle fs-1"></i>
          </div>

          <div className="mt-2 mb-2">
            <div className="form-floating mb-2">
              <input
                name="firstName"
                type="text"
                className="form-control"
                id="firstNameInput"
                placeholder="First Name"
                defaultValue={loggedInUser.firstName}
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              />
              <label className="form-label" htmlFor="firstNameInput">
                First Name
              </label>
            </div>
            <div className="form-floating mb-2">
              <input
                name="lastName"
                type="text"
                className="form-control"
                id="lastNameInput"
                placeholder="Last Name"
                defaultValue={loggedInUser.lastName}
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              />
              <label className="form-label" htmlFor="lastNameInput">
                Last Name
              </label>
            </div>
            <div className="form-floating mb-2">
              <input
                name="phoneNumber"
                type="text"
                className="form-control"
                id="phoneInput"
                placeholder="Phone #"
                defaultValue={
                  loggedInUser.sensitiveInfo &&
                  loggedInUser.sensitiveInfo.phoneNumber
                }
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              />
              <label className="form-label" htmlFor="phoneInput">
                Phone #
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                name="weight"
                type="text"
                className="form-control"
                id="weightInput"
                placeholder="Weight"
                defaultValue={
                  loggedInUser.userStats && loggedInUser.userStats.weight
                }
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              />
              <label className="form-label" htmlFor="weightInput">
                Weight (lbs)
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                name="height"
                type="text"
                className="form-control"
                id="heightInput"
                placeholder="Height"
                defaultValue={
                  loggedInUser.userStats && loggedInUser.userStats.height
                }
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              />
              <label className="form-label" htmlFor="heightInput">
                Height (inches)
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                name="dateOfBirth"
                type="date"
                className="form-control"
                id="dobInput"
                placeholder="Date of Birth"
                defaultValue={
                  loggedInUser.sensitiveInfo &&
                  loggedInUser.sensitiveInfo.dateOfBirth
                }
                min="1900-01-01"
                max="2100-12-31"
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              />
              <label className="form-label" htmlFor="dobInput">
                Birthday
              </label>
            </div>
            <div className="form-floating mb-2">
              <textarea
                name="aboutUser"
                type="text"
                className="form-control"
                id="biographyInput"
                defaultValue={loggedInUser.aboutUser}
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              ></textarea>
              <label className="form-label" htmlFor="biographyInput">
                Biography
              </label>
            </div>

            <div className="d-flex">
              <button
                className="btn btn-success flex-grow-1 me-2"
                onClick={saveProfileBtn}
              >
                Save
              </button>
              <button
                className="btn btn-danger flex-grow-1"
                onClick={cancelEditbtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <footer className="text-center mb-2">
          &copy; Calvin Lee 2022 -
          <Link to="/privacypol" className="text-decoration-none">
            <span className="ms-2">Privacy Policy</span>
          </Link>
        </footer>
      </div>
    );
  }
};

export default EditProfile;
