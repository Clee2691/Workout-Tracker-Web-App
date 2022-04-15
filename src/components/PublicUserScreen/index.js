import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

import { GetUser, GetUserByID } from "../../actions/user-actions";

import NavigationBar from "../NavigationBar";
import RecipeReviewScreen from "../RecipeReviewScreen";
import { GetRecipeRevsByUId } from "../../actions/recipe-review-actions";

const PublicProf = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.userReducer);
  const userRecipeReviews = useSelector((state) => state.reviewReducer);
  const [currUser, setCurrUser] = useState();
  const { uid } = useParams();

  const getInitialInfo = async () => {
    await GetUser(dispatch);
    if (loggedInUser._id !== uid) {
      const userProf = await GetUserByID(uid);
      setCurrUser(userProf);
      await GetRecipeRevsByUId(dispatch, uid);
    } else {
        navigate("/profile");
    }
  };

  useEffect(() => {
    getInitialInfo();
  }, []);

  if (!loggedInUser || loggedInUser._id !== uid) {
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

                  <div className="d-flex justify-content-center flex-wrap">
                    <p className="me-2">Followers: 300</p>
                    <p>Following: 100</p>
                  </div>
                  <hr></hr>
                  <h4 className="mt-2 text-center">About Me:</h4>
                  <p className="card-text">{currUser.aboutUser}</p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="container">
                <h3 className="text-center mb-2">Reviewed Recipes</h3>
                {userRecipeReviews.length > 0 &&
                  userRecipeReviews.map((rev) => {
                    return <RecipeReviewScreen recipeRev={rev} key={rev._id} />;
                  })}
                {userRecipeReviews.length === 0 && (
                  <div className="text-center">User has not reviewed any recipes.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
};

export default PublicProf;
