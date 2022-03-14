import React, { useState, useEffect } from "react";

import NavigationBar from "../NavigationBar";
import SearchResults from "./SearchResults";

const gitHubUrl = "https://api.github.com/users/clee2691";

const RecipeSearch = () => {
  const [userData, setUserData] = useState({});
  const [showResults, setShowresults] = useState(false);

  const getGithubData = async () => {
    const res = await fetch(gitHubUrl);
    const jsonData = await res.json();
    setUserData(jsonData);
    setShowresults(true);
  };

  const searchAgain = () => {
    if (showResults) {
      setShowresults(false);
    }
  };

  if (Object.keys(userData).length !== 0 && showResults) {
    return (
      <>
        <NavigationBar currScreen={"SEARCH"} />
        <div className="container mt-3">
          <div className="d-flex justify-content-between mb-2">
            <h1 className="align-center">Recipe Results</h1>
            <button className="btn btn-danger float-left" onClick={searchAgain}>
              Search Again
            </button>
          </div>
          <SearchResults userData={userData} />
        </div>
      </>
    );
  } else {
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
              />
              <button className="btn btn-success" onClick={getGithubData}>
                Go
              </button>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="fs-3">Instructions:</p>
            <p className="fs-5">
              Enter ingredients such as chicken or rice etc. and press "Go". A
              table of recipes with those ingredients will pop up. You can see
              more details about a specific recipe by clicking "More Details".
              This will list the recipes nutrients along with reviews from other
              members!
            </p>
          </div>
        </div>
      </>
    );
  }
};

export default RecipeSearch;
