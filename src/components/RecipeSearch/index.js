import React from "react";

const RecipeSearch = () => {
  return (
    <>
      <div className="container-fluid">
        <h1 className="text-center">Search Recipes</h1>
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
            <button className="btn btn-success">Go</button>
          </div>
        </div>

        {/* The results of the search */}
        <div className="container mt-2">
          <h2 className="text-center">Results</h2>
          <table className='table table-dark table-striped table-hover text-center ms-auto me-auto table-bordered'>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Calories</th>
              <th></th>
            </tr>
            <tbody>
            <tr>
                <td>Image 1</td>
                <td>Chicken</td>
                <td>106 calories</td>
                <td><button className='btn btn-primary'>More Details</button></td>
            </tr>
            <tr>
                <td>Image 2</td>
                <td>Chicken</td>
                <td>106 calories</td>
                <td><button className='btn btn-primary'>More Details</button></td>
            </tr>
            </tbody>
           
          </table>
        </div>
      </div>
    </>
  );
};

export default RecipeSearch;
