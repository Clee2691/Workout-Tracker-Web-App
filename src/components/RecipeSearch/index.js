import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavigationBar from "../NavigationBar";
import SearchResults from "./SearchResults";

const mealdbURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

const RecipeSearch = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state);

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
          data,
        })
      );
  };

  const searchAgainClickHandler = () => {
    dispatch({
      type: "resetSearch",
    });
  };

  if (Object.keys(searchState.allRecipes).length !== 0 && searchState.allRecipes.meals !== null) {
    return (
      <>
        <NavigationBar currScreen={"SEARCH"} />
        <div className="container mt-3">
          <div className="d-flex justify-content-between mb-2">
            <h1 className="align-center">Recipe Results</h1>
            <button
              className="btn btn-danger float-left"
              onClick={searchAgainClickHandler}
            >
              Search Again
            </button>
          </div>
          <SearchResults />
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavigationBar currScreen={"SEARCH"} />
        <div className="container-fluid mt-2">
          <h1 className="text-center mb-3">Search Recipes</h1>
          {searchState.allRecipes.meals === null && (
            <h1 className='text-center mb-2'>No Results Matched the Keyword. Try another one!</h1>
          )}
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
              <button className="btn btn-success" onClick={searchClickHandler}>
                Go
              </button>
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
            <span>Search powered by: <a href="https://www.themealdb.com/api.php">MealDB</a></span>
          </div>
        </div>
      </>
    );
  }
};

export default RecipeSearch;
