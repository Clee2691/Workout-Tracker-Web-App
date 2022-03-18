import React from "react";

import NavigationBar from "../NavigationBar";
import ProfileWorkouts from "../ProfileScreen/ProfileWorkouts";

const HomeScreen = () => {
  const loggedIn = false;
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
            <h3 className="subtitle-heading text-center">
              Log in or sign-up to start tracking your workouts!
            </h3>
          </div>

          {/* Not logged in will show recipe reviews from users */}
          <div className="container">
            <h1 className="text-center">Recipe Reviews</h1>
          </div>
        </>
      )}
      {loggedIn && (
        <>
          <div className="banner-logo">
            <div className="background-banner" />
            <h1 className="home-heading text-center">
              Welcome back Calvin! 
            </h1>
            <h3 className="subtitle-heading text-center">Scroll down to start logging your workouts!</h3>
          </div>
          {/* Logging in will show your logged workouts */}
          <div className="container mt-2 col-md-8 mb-2">
            <ProfileWorkouts/>
          </div>
          
        </>
      )}
    </>
  );
};

export default HomeScreen;
