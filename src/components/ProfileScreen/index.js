import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUser } from "../../actions/user-actions";
import { Link } from "react-router-dom";
import { format, parseISO, parse } from "date-fns";

import NavigationBar from "../NavigationBar";
import RegisterScreen from "../RegisterScreen";
import ProfileWorkouts from "./ProfileWorkouts";
import EditProfile from "./EditProfile";
import RecipeReviewScreen from "../RecipeReviewScreen";
import ProfileMealPlans from "./ProfileMealPlans";
import ProfileWorkoutPlans from "./ProfileWorkoutPlans";

import { GetRecipeRevsByUId } from "../../actions/recipe-review-actions";
import { GetUserWorkouts } from "../../actions/workout-actions";

import * as clientTrainerActions from "../../actions/client-trainer-actions";
import * as clientNutritionActions from "../../actions/client-nutrition-action";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);

  const loggedInUser = useSelector((state) => state.userReducer);
  const recipeReviews = useSelector((state) => state.reviewReducer);

  const [clientTrainer, setClientTrainer] = useState();
  const [clientNutrition, setClientNutrition] = useState();

  const getAllRelationships = async (role, uid) => {
    if (role === "trainer") {
      const allClients = await clientTrainerActions.GetTrainerClients(uid);
      setClientTrainer(allClients);
    } else if (role === "nutritionist") {
      const allClients = await clientNutritionActions.GetNutritionClients(uid);
      setClientNutrition(allClients);
    } else if (role === "client") {
      const trainers = await clientTrainerActions.GetClientTrainers(uid);
      setClientTrainer(trainers);
      const nutritionists = await clientNutritionActions.GetClientNutrition(
        uid
      );
      setClientNutrition(nutritionists);
    }
  };

  const getInitialInfo = async () => {
    await GetUser(dispatch);
    if (loggedInUser._id) {
      localStorage.setItem("uid", loggedInUser._id);
      localStorage.setItem("role", loggedInUser.userRole);
    }
    await GetRecipeRevsByUId(dispatch, localStorage.getItem("uid"));
    await GetUserWorkouts(dispatch, localStorage.getItem("uid"));
  };

  useEffect(() => {
    getInitialInfo().then(() => {
      getAllRelationships(
        localStorage.getItem("role"),
        localStorage.getItem("uid")
      );
    });
  }, [dispatch]);

  const handleEditbtn = () => {
    setEditing(true);
  };

  if (loggedInUser) {
    if (!isEditing) {
      return (
        <>
          <NavigationBar currScreen={"PROFILE"} />
          <div className="container row mt-4 ms-auto me-auto">
            {/* User profile card on left */}
            <div className="col-sm-5 col-lg-4">
              <div className="card bg-transparent border mb-4">
                <img
                  className="rounded-circle p-3 img-fluid"
                  src={loggedInUser.userProfImgLink}
                ></img>
                <div className="card-body">
                  <h3 className="card-title text-center">
                    {loggedInUser.firstName} {loggedInUser.lastName}
                  </h3>
                  <p className="card-subtitle text-muted text-center">
                    User Role: {loggedInUser.userRole}
                  </p>
                  <p className="text-center">
                    Joined:{" "}
                    {loggedInUser.dateJoined &&
                      format(parseISO(loggedInUser.dateJoined), "dd MMM yyyy")}
                  </p>
                  <p className="card-subtitle text-center">
                    Username: {loggedInUser.username}
                  </p>
                  <hr></hr>
                  <h4 className="mt-2 text-center">About Me:</h4>
                  <p className="card-text">
                    {loggedInUser.aboutUser}
                    {!loggedInUser.aboutUser && "Edit profile to add a bio!"}
                  </p>
                  <hr></hr>
                  <div>
                    <h4 className="text-center">
                      Body Stats (Not publicily visible):
                    </h4>
                    <p>
                      Height:{" "}
                      {loggedInUser.userStats && loggedInUser.userStats.height}{" "}
                      inches.
                    </p>
                    <p>
                      Weight:{" "}
                      {loggedInUser.userStats && loggedInUser.userStats.weight}{" "}
                      lbs.
                    </p>
                  </div>
                  <hr></hr>
                  <div>
                    <h4 className="text-center">
                      Misc (Not publicily visible):
                    </h4>
                    <p className="card-text">
                      Date of Birth:{" "}
                      {loggedInUser.sensitiveInfo.dateOfBirth &&
                        format(
                          parse(
                            loggedInUser.sensitiveInfo.dateOfBirth,
                            "yyyy-MM-dd",
                            new Date()
                          ),
                          "dd MMM yyyy"
                        )}
                    </p>
                    <p className="card-text">
                      Phone #: {loggedInUser.sensitiveInfo.phoneNumber}
                    </p>
                    <p className="card-text">Email: {loggedInUser.email}</p>
                  </div>
                  <hr></hr>
                  {loggedInUser.userRole === "client" && (
                    <div>
                      <h4>Trainers and Nutritionists:</h4>
                      {clientTrainer &&
                        clientTrainer.map((trainer) => {
                          return (
                            <div key={trainer._id}>
                              <Link to={`/profile/${trainer.trainerId}`}>
                                Trainer - {trainer.trainerUserName}
                              </Link>
                            </div>
                          );
                        })}
                      {clientNutrition &&
                        clientNutrition.map((nutrition) => {
                          return (
                            <div key={nutrition._id}>
                              <Link to={`/profile/${nutrition.nutritionistId}`}>
                                Nutritionist - {nutrition.nutritionistUserName}
                              </Link>
                            </div>
                          );
                        })}
                    </div>
                  )}
                  {loggedInUser.userRole === "trainer" && (
                    <div>
                      <h4>Clients:</h4>
                      {clientTrainer &&
                        clientTrainer.map((client) => {
                          return (
                            <div key={client._id}>
                              <Link to={`/profile/${client.clientId}`}>
                                {client.clientUserName}
                              </Link>
                            </div>
                          );
                        })}
                    </div>
                  )}
                  {loggedInUser.userRole === "nutritionist" && (
                    <div>
                      <h4>Clients:</h4>
                      {clientNutrition &&
                        clientNutrition.map((client) => {
                          return (
                            <div key={client._id}>
                              <Link to={`/profile/${client.clientId}`}>
                                {client.clientUserName}
                              </Link>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
                <div className="card-footer bg-transparent text-center">
                  <button
                    className="btn btn-danger mb-2"
                    onClick={handleEditbtn}
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="col">
              {loggedInUser.userRole === "client" && (
                <>
                  <div className="h3 text-center">Your Workouts</div>
                  <ProfileWorkouts />
                </>
              )}
              {loggedInUser.userRole === "trainer" && (
                <>
                  <div className="h3 text-center">Your Workout Plans</div>
                  <div className="d-flex justify-content-center mb-2">
                    <Link to="/workoutplans">
                      <button className="btn btn-primary btn-lg">
                        <i className="fa-solid fa-plus me-2"></i>Create Workout
                        Plan
                      </button>
                    </Link>
                  </div>
                  <ProfileWorkoutPlans userId={localStorage.getItem("uid")} />
                </>
              )}
              {loggedInUser.userRole === "nutritionist" && (
                <>
                  <div className="h3 text-center">Your Meal Plans</div>
                  <div className="d-flex justify-content-center mb-2">
                    <Link to="/mealplans">
                      <button className="btn btn-primary btn-lg">
                        <i className="fa-solid fa-plus me-2"></i>Create Meal
                        Plan
                      </button>
                    </Link>
                  </div>
                  <ProfileMealPlans userId={localStorage.getItem("uid")} />
                </>
              )}

              <hr></hr>
              <div className="container">
                <h3 className="text-center mb-2">Your Reviewed Recipes</h3>
                {recipeReviews.length > 0 &&
                  recipeReviews.map((rev) => {
                    return (
                      <RecipeReviewScreen
                        recipeRev={{ reviews: rev, uid: loggedInUser._id }}
                        key={rev._id}
                      />
                    );
                  })}
                {recipeReviews.length === 0 && (
                  <div className="text-center">
                    No reviews! Search for recipes to review them!
                  </div>
                )}
              </div>
            </div>
          </div>
          <footer className="text-center mb-2">
            &copy; Calvin Lee 2022 -
            <Link to="/privacypol" className="text-decoration-none">
              <span className="ms-2">Privacy Policy</span>
            </Link>
          </footer>
        </>
      );
    } else {
      return <EditProfile isEdit={isEditing} />;
    }
  } else {
    return <RegisterScreen />;
  }
};

export default ProfileScreen;
