import { useEffect, useState } from "react";

import NavigationBar from "../NavigationBar";
import RecipeReviewScreen from "../RecipeReviewScreen";

import { GetAllReviews } from "../../actions/recipe-review-actions";

const AllRecipeReviewScreen = () => {
  const [allRevs, setAllRevs] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  const getTheReviews = async () => {
    const reviews = await GetAllReviews();
    setAllRevs(reviews);
  };

  useEffect(() => {
    getTheReviews();
  }, []);

  return (
    <>
      <NavigationBar currScreen={"RECIPEREVS"} />
      <div className="container col-md-6 mt-2">
        <h1 className="text-center mb-2">All Recipe Reviews</h1>
        <div className="input-group mb-2 mt-2">
          <label className="input-label me-2">Search Recipe Name:</label>
          <input
            className="form-control"
            placeholder="Chicken..."
            onChange={(e) => {
              setSearchFilter(e.target.value);
            }}
          />
        </div>
        {allRevs.length > 0 &&
          allRevs
            .filter((reviews) => reviews.mealName.includes(searchFilter))
            .map((rev) => {
              return (
                <RecipeReviewScreen
                  recipeRev={{ reviews: rev }}
                  key={rev._id}
                />
              );
            })}
      </div>
      <footer className="text-center mb-2">
        &copy; Calvin Lee 2022 - <a href="/privacypol">Privacy Policy</a>
      </footer>
    </>
  );
};

export default AllRecipeReviewScreen;
