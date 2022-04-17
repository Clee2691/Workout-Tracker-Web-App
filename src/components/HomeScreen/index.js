import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import ProfileWorkouts from "../ProfileScreen/ProfileWorkouts";
import RecipeReviewScreen from "../RecipeReviewScreen";
import ProfileMealPlans from "../ProfileScreen/ProfileMealPlans";
import ProfileWorkoutPlans from "../ProfileScreen/ProfileWorkoutPlans";

import { GetUser } from "../../actions/user-actions";
import { GetRecentReviews } from "../../actions/recipe-review-actions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userReducer);
  const recentReviews = useSelector((state) => state.reviewReducer);

  useEffect(() => {
    GetUser(dispatch);
    GetRecentReviews(dispatch);
    console.log(loggedInUser);
  }, [dispatch]);

  const getUser = () => {
    console.log(loggedInUser);
  }

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
              Log in or sign-up to access all features!
            </h3>
            <button onClick={getUser}>USer</button>
          </div>

          {/* Not logged in will show recipe reviews from users */}
          <div className="container col-md-6 mt-2 mb-4">
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
                return (
                  <RecipeReviewScreen
                    recipeRev={{ reviews: rev }}
                    key={rev._id}
                  />
                );
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
              Welcome back {loggedInUser.username}
            </h1>
          </div>
        </>
      )}
      {loggedInUser && loggedInUser.userRole === "client" && (
        <>
          <div className="container mt-2 col-md-8 mb-2">
            <h2 className="text-center">Your Recent Workouts</h2>
            <ProfileWorkouts userId={loggedInUser._id} />
          </div>
        </>
      )}

      {loggedInUser && loggedInUser.userRole === "trainer" && (
        <>
          <div className="container mt-2 col-md-6 mb-2">
            <h2 className="text-center">Your Workout Plans</h2>
            <div className="text-center">
              <Link to="/workoutplans">
                <button className="btn btn-primary me-2 mb-2">
                  <i className="fa fa-plus me-2"></i> Create Workout Plan
                </button>
              </Link>
            </div>
            <ProfileWorkoutPlans userId={loggedInUser._id} />
          </div>
        </>
      )}

      {loggedInUser && loggedInUser.userRole === "nutritionist" && (
        <>
          <div className="container mt-2 col-md-6 mb-2">
            <h2 className="text-center">Your Meal Plans</h2>
            <div className="text-center mb-2">
              <Link to="/mealplans">
                <button className="btn btn-success me-2">
                  <i className="fa fa-plus"></i>Create Meal Plan
                </button>
              </Link>
            </div>

            <ProfileMealPlans userId={loggedInUser._id} />
          </div>
        </>
      )}
      <footer className="text-center mb-2">
        &copy; Calvin Lee 2022 -
        <Link to="/privacypol" className="text-decoration-none">
          <span className="ms-2">Privacy Policy</span>
        </Link>
      </footer>
    </>
  );
};

export default HomeScreen;
