import React, { useEffect, useState } from "react";
import { format, parseISO, parse } from "date-fns";

import NavigationBar from "../NavigationBar";
import RegisterScreen from "../RegisterScreen";
import ProfileWorkouts from "./ProfileWorkouts";
import ProfileFollow from "./ProfileFollow";
import EditProfile from "./EditProfile";
import RecipeReviewScreen from "../RecipeReviewScreen";

import { useDispatch, useSelector } from "react-redux";
import { GetUser } from "../../actions/user-actions";
import { GetRecipeRevsByUId } from "../../actions/recipe-review-actions";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);

  const loggedInUser = useSelector((state) => state.userReducer);
  const recipeReviews = useSelector((state) => state.reviewReducer);

  const getInitialInfo = async () => {
    await GetUser(dispatch);
    if (loggedInUser._id){
      localStorage.setItem("uid", loggedInUser._id);
    }
    await GetRecipeRevsByUId(dispatch, localStorage.getItem("uid"));
  };

  useEffect(() => {
    getInitialInfo();
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
            <div className="col-sm-4 col-lg-4">
              <div className="card bg-transparent border">
                <img
                  className="rounded-circle p-3 img-fluid"
                  src="../images/avatars/profilemale1.jpg"
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

                  <div className="d-flex justify-content-center flex-wrap">
                    <p className="me-2">Followers: 300</p>
                    <p>Following: 100</p>
                  </div>
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
                      {loggedInUser.dateOfBirth &&
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
              <div className="h2 text-center">Workouts</div>
              <ProfileWorkouts />
              <hr></hr>
              <div className="container">
                <h2 className="text-center mb-2">Your Reviewed Recipes</h2>
                {recipeReviews.length > 0 &&
                  recipeReviews.map((rev) => {
                    return <RecipeReviewScreen recipeRev={rev} key={rev._id}/>;
                  })}
                {recipeReviews.length === 0 && (
                  <div>No reviews! Search for recipes to review them!</div>
                )}
              </div>
              <hr></hr>
              <h2 className="text-center">People you Follow</h2>
              <ProfileFollow />
            </div>
          </div>
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
