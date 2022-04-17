import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";

import axios from "axios";

import NavigationBar from "../NavigationBar";
import { GetUser } from "../../actions/user-actions";
import {
  GetMealReviews,
  CreateMealReview,
  DeleteMealReview,
} from "../../actions/recipe-review-actions";

const foodURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

const ItemDetails = () => {
  const [selectedItem, setSelected] = useState({});
  const recipeReviews = useSelector((state) => state.reviewReducer);
  const loggedInUser = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({});

  const [newReview, setNewReview] = useState({
    mealId: id,
  });

  const mergeIngredientList = function () {
    // Mapping ingredients with their measurements from the json response
    const ingredientArray = [];

    Object.keys(selectedItem).forEach((theKey) => {
      if (
        theKey.includes("Ingredient") &&
        selectedItem[theKey] !== null &&
        selectedItem[theKey].length > 0
      ) {
        ingredientArray.push(selectedItem[theKey]);
      }
    });

    const ingredientMeasureArray = [];

    Object.keys(selectedItem).forEach((theKey) => {
      if (
        theKey.includes("Measure") &&
        selectedItem[theKey] !== null &&
        selectedItem[theKey].length > 0
      ) {
        ingredientMeasureArray.push(selectedItem[theKey]);
      }
    });

    const mapped = ingredientArray.map((ingred, meas) => {
      return {
        _id: Math.random().toString(20).substring(2, 18),
        ingredient: ingred,
        measure: ingredientMeasureArray[meas],
      };
    });

    return mapped;
  };

  // Connects to external API for recipe information
  const getItemById = async () => {
    const response = await axios.get(`${foodURL}${id}`);
    setSelected(response.data.meals[0]);
  };

  const handleReviewInput = (event) => {
    const { name, value } = event.target;
    const theReview = {
      ...newReview,
      [name]: value,
    };
    setNewReview(theReview);
  };

  const revValidate = (review) => {
    let errorList = { ...formErrors };

    if (!review.revString) {
      errorList.revStringErr = "You must enter text for the review!";
    } else if (review.revString && formErrors.revStringErr) {
      delete errorList.revStringErr;
    }

    if (review.starRating < 0 || review.starRating > 5) {
      errorList.rateError = "You can only rate between 0 and 5!";
    } else if (
      review.starRating >= 0 &&
      review.starRating < 6 &&
      formErrors.rateError
    ) {
      delete errorList.rateError;
    }

    setFormErrors(errorList);

    if (Object.keys(errorList).length !== 0) {
      return false;
    }
    return true;
  };

  const sendReview = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const finalReview = {
      ...newReview,
      userId: user._id,
      userName: user.username,
      mealPic: selectedItem.strMealThumb,
      mealName: selectedItem.strMeal,
    };
    const isValid = revValidate(finalReview);
    if (isValid) {
      CreateMealReview(dispatch, finalReview).catch((e) => {
        if (e.response.status === 403) {
          alert("You can only review a recipe once. Edit your review instead.");
        }
      });
      alert("Created Review!");
    }
  };

  const deleteCurrReview = (revId) => {
    DeleteMealReview(dispatch, revId);
  };

  useEffect(() => {
    getItemById();
    GetMealReviews(dispatch, id);
    GetUser(dispatch);
    if (loggedInUser._id) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  }, [dispatch]);

  if (Object.keys(selectedItem).length === 0) {
    return (
      <>
        <NavigationBar />
        <div className="container-fluid mt-2 mb-2">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Back to List
          </button>
          <h1 className="text-center">LOADING...</h1>
        </div>
      </>
    );
  } else {
    const mappedIngredients = mergeIngredientList();
    return (
      <>
        <NavigationBar />
        <div className="container-fluid mt-2 mb-2">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Back to List
          </button>

          <h1 className="text-center">{selectedItem.strMeal}</h1>
          <img
            className="rounded mx-auto d-block w-50"
            src={selectedItem.strMealThumb}
          ></img>

          {/* The item details */}
          <div className="container">
            <h2 className="mt-2 text-center">Ingredients</h2>
            <div className="col-md-7 ms-auto me-auto">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>Ingredient Name</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {mappedIngredients.map((ingredient) => {
                    return (
                      <tr key={ingredient._id}>
                        <td>{ingredient.ingredient}</td>
                        <td>{ingredient.measure}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-2 mb-2">
              <h2 className="text-center">Directions</h2>
              <p>{selectedItem.strInstructions}</p>
              {selectedItem.strSource !== "" && selectedItem.strSource && (
                <a
                  className="text-decoration-none"
                  href={selectedItem.strSource}
                >
                  Source
                </a>
              )}
            </div>
          </div>
          <hr></hr>
          {/* Item reviews */}
          <div className="container">
            <h4 className="text-center">User Reviews</h4>
            {/* Show reviews from my DB if there are any */}
            {recipeReviews.length > 0 &&
              recipeReviews.map((review) => {
                return (
                  <div className="border border-light p-2 mb-2" key={review._id}>
                    <Link to={`/profile/${review.userId}`}>
                      {review.userName}
                    </Link>
                    -
                    <span className="text-muted">
                      {format(parseISO(review.revDate), "dd MMM yyyy")}
                    </span>
                    {loggedInUser._id === review.userId && (
                      <span className="float-end">
                        <i
                          className="fa-solid fa-x"
                          onClick={() => {
                            deleteCurrReview(review._id);
                          }}
                        ></i>
                      </span>
                    )}
                    <p>Rating: {review.starRating}/5</p>
                    <p>{review.revString}</p>
                  </div>
                );
              })}
            {recipeReviews.length === 0 && (
              <div>Be the first to review this recipe!</div>
            )}
            {/* Allowing adding reviews if you are logged in */}
            {loggedInUser && (
              <div className="container col-8">
                <p className="lead">Add Your Own Review: </p>
                <div className="input-group mt-2 mb-2">
                  <label className="form-label me-2" htmlFor="starInput">
                    Rating
                  </label>
                  <input
                    name="starRating"
                    type="number"
                    className="form-control form-control-sm me-2"
                    defaultValue={0}
                    min="0"
                    max="5"
                    id="starInput"
                    onChange={(e) => {
                      handleReviewInput(e);
                    }}
                  /> Out of 5
                </div>
                {formErrors && formErrors.rateError && (
                  <p className="text-danger">{formErrors.rateError}</p>
                )}
                <textarea
                  name="revString"
                  className="form-control"
                  placeholder="Did you try this recipe?"
                  onChange={(e) => {
                    handleReviewInput(e);
                  }}
                ></textarea>
                {formErrors && formErrors.revStringErr && (
                  <p className="text-danger">{formErrors.revStringErr}</p>
                )}
                <button className="btn btn-success mt-2" onClick={sendReview}>
                  Review
                </button>
              </div>
            )}
            {!loggedInUser && (
              <div className="container col-8 h4 text-center mb-3">
                <a className="text-decoration-none" href="/login">
                  Log In
                </a>{" "}
                or{" "}
                <a className="text-decoration-none" href="/register">
                  Register
                </a>{" "}
                to add your own review!
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
};

export default ItemDetails;
