import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import NavigationBar from "../NavigationBar";

const mealdbURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

const RecipeSearch = () => {
  const dispatch = useDispatch();

  const [searchkeyword, setKeyword] = useState("");

  const keywordChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  const searchClickHandler = () => {
    const finalUrl = mealdbURL + searchkeyword;
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: "search",
          data
        })
      );
  };

    return (
      <>
        <NavigationBar currScreen={"SEARCH"} />
        <div className="container-fluid mt-2">
          <h1 className="text-center mb-3">Search Recipes</h1>
          <div className="container col-md-6">
            <div className="input-group mt-2">
              <label
                className="input-group-text bg-transparent border border-secondary"
                htmlFor="recipe-search-bar"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search Recipes..."
                id="recipe-search-bar"
                onChange={keywordChangeHandler}
              />
              <Link to={`${searchkeyword}`}>
                <button
                  className="btn btn-success"
                  onClick={searchClickHandler}
                >
                  Go
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="fs-3">Instructions:</p>
            <p className="fs-5">
              Enter a keyword such as chicken or rice etc. and press "Go". A
              table of recipes with those ingredients will pop up. You can see
              more details about a specific recipe by clicking "More Details".
              This will list the ingredients and instructions along with reviews
              from other members!
            </p>
            <span>
              Search powered by:{" "}
              <a href="https://www.themealdb.com/api.php">MealDB</a>
            </span>
          </div>
        </div>
      </>
    );
  
};

export default RecipeSearch;
