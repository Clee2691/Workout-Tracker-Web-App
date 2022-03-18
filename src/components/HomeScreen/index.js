import React from "react";
import { Link } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import ProfileWorkouts from "../ProfileScreen/ProfileWorkouts";

const HomeScreen = () => {
  const loggedIn = true;
  return (
    <>
      <NavigationBar currScreen={"HOME"} />
      {!loggedIn && (
        <>
          <div className="banner-logo">
            <div className="background-banner" />
            <h1 className="home-heading text-center">
              SwoleMate's Workout Log
            </h1>
            <h2 className="subtitle-heading text-center">
              Log in or sign-up to start tracking your workouts! In the
              meantime, checkout other user's and their number of workouts!
            </h2>
          </div>

          <div className="container">
            <h1>Recent User Workouts</h1>
          </div>
        </>
      )}
      {loggedIn && (
        <>
          <div className="banner-logo">
            <div className="background-banner" />
            <h1 className="home-heading text-center">
              Welcome back Calvin! Scroll down to start logging your workouts!
            </h1>
          </div>
          <div className="container mt-2 col-md-8 mb-2">
            <ProfileWorkouts/>
          </div>
          
        </>
      )}
    </>
  );
};

export default HomeScreen;
