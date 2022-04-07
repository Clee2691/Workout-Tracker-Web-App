import React, { useEffect, useState } from "react";

import NavigationBar from "../NavigationBar";
import RegisterScreen from "../RegisterScreen";
import ProfileInfo from "./ProfileInfo";
import ProfileWorkouts from "./ProfileWorkouts";
import ProfileFollow from "./ProfileFollow";
import EditProfile from "./EditProfile";
import RecipeReviewScreen from "../RecipeReviewScreen";

import * as service from "../../service/auth-service";

const ProfileScreen = () => {
  const isEditing = false;

  const [loggedInUser, setLogInUser] = useState("");

  const getUser = async (isMounted, abortCont) => {
    const user = await service.profile(abortCont);
    if (isMounted) {
      setLogInUser(user);
    } else {
      console.log("Dismounted");
    }
  };

  useEffect(() => {
    const abortCont = new AbortController();
    let isMounted = true;
    getUser(isMounted, abortCont);
    return () => {
      isMounted = false;
      abortCont.abort();
    };
  }, []);

  const currScreen = "WORKOUTS";

  if (loggedInUser) {
    if (!isEditing) {
      return (
        <>
          <NavigationBar currScreen={"PROFILE"} />
          <div className="container row mt-4 ms-auto me-auto">
            <ProfileInfo />

            <div className="col">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      currScreen === "WORKOUTS" ? "active" : ""
                    } `}
                    href="#"
                  >
                    Your Workouts
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      currScreen === "RECIPEREV" ? "active" : ""
                    }`}
                    href="#"
                  >
                    Your Recipe Reviews
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      currScreen === "FOLLOW" ? "active" : ""
                    }`}
                    href="#"
                  >
                    Your Friends
                  </a>
                </li>
              </ul>
              {currScreen === "WORKOUTS" && <ProfileWorkouts />}
              {currScreen === "RECIPEREV" && (
                <RecipeReviewScreen profileScreen={true} />
              )}
              {currScreen === "FOLLOW" && <ProfileFollow />}
            </div>
          </div>
        </>
      );
    } else {
      return <EditProfile />;
    }
  } else {
    return <RegisterScreen />;
  }
};

export default ProfileScreen;
