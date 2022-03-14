import React from "react";
import { Link } from "react-router-dom";

import NavigationBar from "../NavigationBar";

const SearchResults = ({ userData }) => {
  return (
    <>
      {/* The results of the search */}
        <table className="table table-dark table-striped table-hover text-center align-middle ms-auto me-auto table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Calories</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <img className="img-fluid" src={userData.avatar_url} />
              </td>
              <td>{userData.name}</td>
              <td>{userData.company}</td>
              <td>
                <button className="btn btn-primary">More Details</button>
              </td>
            </tr>
            <tr>
              <td>Image 2</td>
              <td>Chicken</td>
              <td>106 calories</td>
              <td>
                <button className="btn btn-primary">More Details</button>
              </td>
            </tr>
          </tbody>
        </table>

    </>
  );
};

export default SearchResults;
