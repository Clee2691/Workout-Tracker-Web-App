import React from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

import { DeleteMealReview } from "../../actions/recipe-review-actions";

const RecipeReviewScreen = ({ recipeRev }) => {

  const dispatch = useDispatch();

  const deleteCurrReview = (revId) => {
    DeleteMealReview(dispatch, revId); 
  };

  return (
    <>
      <div className="card bg-transparent mb-2 border">
        <div className="row g-0">
          <div className="col-md-6 col-lg-4 d-flex align-self-center p-3 justify-content-center">
            <img
              className="img-fluid rounded-circle w-75"
              src={recipeRev.reviews.mealPic}
            ></img>
          </div>
          <div className="col-md d-flex">
            <div className="card-body align-self-start text-center p-1">
              <h4 className="card-title mt-2">
                Recipe:
                <Link to={`/details/${recipeRev.reviews.mealId}`}>
                  <span className="text-decoration-none fs-5 ms-1">
                    {recipeRev.reviews.mealName}
                  </span>
                </Link>
                {recipeRev.uid === recipeRev.reviews.userId && (
                  <span className="float-end me-2">
                    <i
                      className="fa-solid fa-x"
                      onClick={() => {
                        deleteCurrReview(recipeRev.reviews._id);
                      }}
                    ></i>
                  </span>
                )}
              </h4>
              <hr className="me-2"></hr>
              <p className="fs-5">
                Reviewed By:{" "}
                <Link to={`/profile/${recipeRev.reviews.userId}`}>
                  {recipeRev.reviews.userName}
                </Link>{" "}
                on {format(parseISO(recipeRev.reviews.revDate), "dd MMM yyyy")}
              </p>
              <p className="fs-5">Rating: {recipeRev.reviews.starRating}/5</p>
              <p className="fs-5">{recipeRev.reviews.revString}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeReviewScreen;
