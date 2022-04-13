import React from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const RecipeReviewScreen = ({recipeRev}) => {
  // If in profile screen, get user's recipe reviews
  // If on homepage get the 5 most recent reviews
  return (
    <>
      {/* Map this to a list of reviewed recipes */}
      <div className="card bg-transparent mb-2 border">
        <div className="row g-0">
          <div className="col-md-6 col-lg-4 d-flex align-self-center p-3">
            <img
              className="img-fluid rounded-circle"
              src={recipeRev.mealPic}
            ></img>
          </div>
          <div className="col-md d-flex">
            <div className="card-body align-self-start text-center p-1">
              <h2 className="card-title mt-2">
                Recipe:
                <Link to={`/details/${recipeRev.mealId}`}>
                  <span className="text-decoration-none ms-1">
                    {recipeRev.mealName}
                  </span>
                </Link>
              </h2>
              <p>
                Reviewed By: <a href="#">{recipeRev.userName}</a> on{" "}
                {format(parseISO(recipeRev.revDate), "dd MMM yyyy")}
              </p>
              <p>Rating: {recipeRev.starRating}/5</p>
              <p>{recipeRev.revString}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeReviewScreen;
