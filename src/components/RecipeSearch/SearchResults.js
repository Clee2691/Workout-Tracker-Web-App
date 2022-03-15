import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const allItems = (state) => state.allRecipes;

const SearchResults = () => {
  const allRecipes = useSelector(allItems);

  return (
    <>
      {/* The results of the search */}
      <table className="table table-dark table-striped table-hover text-center align-middle ms-auto me-auto table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {allRecipes.meals.map((recipe) => {
            return (
              <tr>
                <td>{recipe.idMeal}</td>
                <td>
                  <img className="img-fluid w-50" src={recipe.strMealThumb} />
                </td>
                <td>{recipe.strMeal}</td>

                <td>
                  <Link to={`/details/${recipe.idMeal}`}>
                    <button className="btn btn-primary">More Details</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SearchResults;
