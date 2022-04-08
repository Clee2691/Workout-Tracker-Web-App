import React, { useEffect } from "react";

import NavigationBar from "../NavigationBar";
import ProfileWorkouts from "../ProfileScreen/ProfileWorkouts";
import RecipeReviewScreen from "../RecipeReviewScreen";

import { GetUser } from "../../actions/user-actions";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.userReducer);

  useEffect(() => {
    GetUser(dispatch);
  }, [dispatch]);

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
