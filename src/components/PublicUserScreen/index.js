import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

import NavigationBar from "../NavigationBar";
import RecipeReviewScreen from "../RecipeReviewScreen";
import ProfileWorkoutPlans from "../ProfileScreen/ProfileWorkoutPlans";
import ProfileMealPlans from "../ProfileScreen/ProfileMealPlans";

import { GetRecipeRevsByUId } from "../../actions/recipe-review-actions";
import { GetUser, GetUserByID } from "../../actions/user-actions";
import * as clientTrainerActions from "../../actions/client-trainer-actions";
import * as clientNutritionActions from "../../actions/client-nutrition-action";
import ProfileScreen from "../ProfileScreen";

const PublicProf = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.userReducer);
  const userRecipeReviews = useSelector((state) => state.reviewReducer);
  const [currUser, setCurrUser] = useState();
  const [clientRelation, setClientRelation] = useState();
  const [allRelations, setAllRelations] = useState();

  const [clientTrainers, setClientTrainers] = useState();
  const [clientNutritionists, setClientNutritionists] = useState();

  const { uid } = useParams();

  const getRelation = async (role) => {
    let relation = null;

    if (role === "trainer") {
      relation = await clientTrainerActions.GetExisitingRelation(
        localStorage.getItem("uid"),
        uid
      );
    } else if (role === "nutritionist") {
      relation = await clientNutritionActions.GetExistingRelation(
        localStorage.getItem("uid"),
        uid
      );
    }
    setClientRelation(relation);
  };

  const getAllRelationships = async (role) => {
    if (role === "trainer") {
      const allRels = await clientTrainerActions.GetTrainerClients(uid);
      setAllRelations(allRels);
    } else if (role === "nutritionist") {
      const allRels = await clientNutritionActions.GetNutritionClients(uid);
      setAllRelations(allRels);
    } else if (role === "client") {
      const trainers = await clientTrainerActions.GetClientTrainers(uid);
      setClientTrainers(trainers);
      const nutritionists = await clientNutritionActions.GetClientNutrition(
        uid
      );
      setClientNutritionists(nutritionists);
    }
  };

  const getInitialInfo = async () => {
    await GetUser(dispatch);
    if (loggedInUser._id) {
      localStorage.setItem("uid", loggedInUser._id);
    }
    if (loggedInUser._id !== uid) {
      const userProf = await GetUserByID(uid);
      setCurrUser(userProf);
      await GetRecipeRevsByUId(dispatch, uid);
      if (userProf.userRole === "trainer") {
        await getRelation("trainer");
        await getAllRelationships("trainer");
      } else if (userProf.userRole === "nutritionist") {
        await getRelation("nutritionist");
        await getAllRelationships("nutritionist");
      } else if (userProf.userRole === "client") {
        await getAllRelationships("client");
      }
    } else {
      navigate("/profile");
    }
  };

  useEffect(() => {
    getInitialInfo();
  }, []);

  const followBtnHandler = (role) => {
    if (role === "trainer") {
      const newRelation = {
        clientId: loggedInUser._id,
        clientUserName: loggedInUser.username,
        trainerId: currUser._id,
        trainerUserName: currUser.username,
      };

      clientTrainerActions
        .CreateRelation(newRelation)
        .then(() => {
          getRelation("trainer");
          getAllRelationships("trainer");
        })
        .catch((e) => {
          alert("Already following!");
        });
    } else if (role === "nutritionist") {
      const newRelation = {
        clientId: loggedInUser._id,
        clientUserName: loggedInUser.username,
        nutritionistId: currUser._id,
        nutritionistUserName: currUser.username,
      };
      clientNutritionActions
        .CreateRelation(newRelation)
        .then(() => {
          getRelation("nutritionist");
          getAllRelationships("nutritionist");
        })
        .catch((e) => {
          alert("Already following!");
        });
    }
  };

  const stopFollowBtnHandler = (role) => {
    if (role === "trainer") {
      clientTrainerActions.DeleteRelation(clientRelation._id).then(() => {
        setClientRelation(null);
      });
    } else if (role === "nutritionist") {
      clientNutritionActions.DeleteRelation(clientRelation._id).then(() => {
        setClientRelation(null);
      });
    }
  };

  if (!loggedInUser || localStorage.getItem("uid") !== uid) {
    return (
      <>
        <NavigationBar />
        {currUser && (
          <div className="container row mt-4 ms-auto me-auto">
            <div className="col-sm-4 col-lg-4">
              <div className="card bg-transparent border">
                <img
                  className="rounded-circle p-3 img-fluid"
                  src="../images/avatars/profilemale1.jpg"
                ></img>
                <div className="card-body">
                  <h3 className="card-title text-center">
                    {currUser.firstName} {currUser.lastName}
                  </h3>
                  <p className="card-subtitle text-muted text-center">
                    User Role: {currUser.userRole}
                  </p>
                  <p className="text-center">
                    Joined:{" "}
                    {currUser.dateJoined &&
                      format(parseISO(currUser.dateJoined), "dd MMM yyyy")}
                  </p>
                  <p className="card-subtitle text-center">
                    Username: {currUser.username}
                  </p>
                  {/* Trainer follows */}
                  {loggedInUser.userRole === "client" &&
                    currUser.userRole === "trainer" &&
                    !clientRelation && (
                      <div className="d-flex justify-content-center mt-2">
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            followBtnHandler("trainer");
                          }}
                        >
                          Follow Trainer
                        </button>
                      </div>
                    )}
                  {loggedInUser.userRole === "client" &&
                    currUser.userRole === "trainer" &&
                    clientRelation && (
                      <div className="d-flex justify-content-center mt-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            stopFollowBtnHandler("trainer");
                          }}
                        >
                          Stop Following
                        </button>
                      </div>
                    )}
                  {/* Nutritionist follows */}
                  {loggedInUser.userRole === "client" &&
                    currUser.userRole === "nutritionist" &&
                    !clientRelation && (
                      <div className="d-flex justify-content-center mt-2">
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            followBtnHandler("nutritionist");
                          }}
                        >
                          Follow Nutritionist
                        </button>
                      </div>
                    )}
                  {loggedInUser.userRole === "client" &&
                    currUser.userRole === "nutritionist" &&
                    clientRelation && (
                      <div className="d-flex justify-content-center mt-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            stopFollowBtnHandler("nutritionist");
                          }}
                        >
                          Stop Following
                        </button>
                      </div>
                    )}
                  <hr></hr>
                  <h4 className="mt-2 text-center">About Me:</h4>
                  <p className="card-text">{currUser.aboutUser}</p>
                  <hr></hr>
                  {/* Trainer or nutritionists clients */}
                  {(currUser.userRole === "trainer" ||
                    currUser.userRole === "nutritionist") && <h4>Clients:</h4>}

                  {/* Has clients */}
                  {(currUser.userRole === "trainer" ||
                    currUser.userRole === "nutritionist") &&
                    allRelations &&
                    allRelations.map((oneClient) => {
                      return (
                        <div key={oneClient._id}>
                          <a href={`/profile/${oneClient.clientId}`}>
                            {oneClient.clientUserName}
                          </a>
                        </div>
                      );
                    })}

                  {/* No clients */}
                  {(currUser.userRole === "trainer" ||
                    currUser.userRole === "nutritionist") &&
                    allRelations &&
                    allRelations.length < 1 && <p>No clients yet!</p>}

                  {/* Client Trainers/ Nutritionists */}
                  {currUser.userRole === "client" && <h4>Trainers: </h4>}
                  {/* Trainers */}
                  {currUser.userRole === "client" &&
                    clientTrainers &&
                    clientTrainers.map((trainer) => {
                      return (
                        <a
                          href={`/profile/${trainer.trainerId}`}
                          key={trainer._id}
                        >
                          {trainer.trainerUserName}
                        </a>
                      );
                    })}

                  {currUser.userRole === "client" &&
                    clientTrainers &&
                    clientTrainers.length < 1 && <p>No trainers yet!</p>}

                  {/* Nutritionists */}
                  {currUser.userRole === "client" && <h4>Nutritionists: </h4>}
                  {currUser.userRole === "nutritionist" &&
                    clientNutritionists &&
                    clientNutritionists.map((nutritionist) => {
                      return (
                        <a
                          href={`/profile/${nutritionist.nutritionistId}`}
                          key={nutritionist._id}
                        >
                          {nutritionist.nutritionistUserName}
                        </a>
                      );
                    })}
                  {currUser.userRole === "client" &&
                    clientNutritionists &&
                    clientNutritionists.length < 1 && (
                      <p>No nutritionists yet!</p>
                    )}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="container">
                <h3 className="text-center mb-2">Reviewed Recipes</h3>
                {userRecipeReviews.length > 0 &&
                  userRecipeReviews.map((rev) => {
                    return (
                      <RecipeReviewScreen
                        recipeRev={{ reviews: rev }}
                        key={rev._id}
                      />
                    );
                  })}
                {userRecipeReviews.length === 0 && (
                  <div className="text-center">
                    User has not reviewed any recipes.
                  </div>
                )}
                <hr className="ms-4 me-4"></hr>
                {currUser.userRole === "trainer" && (
                  <>
                    <div className="h3 text-center">Your Workout Plans</div>
                    <ProfileWorkoutPlans userId={uid} />
                  </>
                )}
                {currUser.userRole === "nutritionist" && (
                  <>
                    <div className="h3 text-center">Your Meal Plans</div>
                    <ProfileMealPlans userId={uid} />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else if (localStorage.getItem("uid") === uid) {
    return <ProfileScreen />;
  } else {
    return null;
  }
};

export default PublicProf;
