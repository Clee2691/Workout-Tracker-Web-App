import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import ProfileWorkouts from "../ProfileScreen/ProfileWorkouts";
import RecipeReviewScreen from "../RecipeReviewScreen";

import { GetUser } from "../../actions/user-actions";
import { GetRecentReviews } from "../../actions/recipe-review-actions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.userReducer);
  const recentReviews = useSelector(state => state.reviewReducer);

  useEffect(() => {
    GetUser(dispatch);
    GetRecentReviews(dispatch);
  }, [dispatch]);

  return (
    <>
      <NavigationBar currScreen={"HOME"} />
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
            <h1 className="text-center mb-2">
              Latest Reviewed Recipes{" "}
              <span>
                <Link to="/recipe-reviews">
                  <button className="btn btn-primary">View All Reviews</button>
                </Link>
              </span>
            </h1>
            {recentReviews.length > 0 &&
              recentReviews.map((rev) => {
                return <RecipeReviewScreen recipeRev={rev} key={rev._id} />;
              })}
            {!recentReviews && <p>No reviews currently for any recipes.</p>}
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
            <h2 className="text-center">Your Recent Workouts</h2>
            <ProfileWorkouts userId = {loggedInUser._id}/>
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
