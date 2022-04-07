import React, { useState, useEffect } from "react";
import axios from "axios";

import NavigationBar from "../NavigationBar";
import ProfileWorkouts from "../ProfileScreen/ProfileWorkouts";
import RecipeReviewScreen from "../RecipeReviewScreen";

import * as service from "../../service/auth-service.js";

const HomeScreen = () => {
  const [loggedInUser, setUser] = useState({});

  const getUser = async (isMounted, abortCont) => {
    const user = await service.profile(abortCont);
    if (isMounted) {
      setUser(user);
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

  return (
    <>
      <NavigationBar
        currScreen={"HOME" }
      />
      {!loggedInUser && (
        <>
          <div className="banner-logo">
            <div className="background-banner" />
            <h1 className="home-heading text-center">
              SwoleMate's Workout Log
            </h1>
            <h3 className="subtitle-heading text-center">
              Log in or sign-up to start tracking your workouts!
            </h3>
          </div>

          {/* Not logged in will show recipe reviews from users */}
          <div className="container">
            <RecipeReviewScreen profileScreen={false} />
          </div>
        </>
      )}
      {loggedInUser && (
        <>
          <div className="banner-logo">
            <div className="background-banner" />
            <h1 className="home-heading text-center">
              Welcome back {loggedInUser.userName}
            </h1>
            <h3 className="subtitle-heading text-center">
              Scroll down to start logging your workouts!
            </h3>
          </div>
          {/* Logging in will show your logged workouts */}
          <div className="container mt-2 col-md-8 mb-2">
            <ProfileWorkouts />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
