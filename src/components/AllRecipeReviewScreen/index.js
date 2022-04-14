import { useEffect, useState } from "react";

import NavigationBar from "../NavigationBar";
import RecipeReviewScreen from "../RecipeReviewScreen";

import { GetAllReviews } from "../../actions/recipe-review-actions";

const AllRecipeReviewScreen = () => {

    const [allRevs, setAllRevs] = useState([]);


    const getTheReviews = async () => {
        const reviews = await GetAllReviews();
        setAllRevs(reviews);
    }

    useEffect(() => {
        getTheReviews();
    }, [])

    return (
      <>
        <NavigationBar currScreen={"RECIPEREVS"} />
        <div className="container-fluid mt-2">
          <h1 className="text-center">All Recipe Reviews</h1>
          {allRevs.length > 0 && allRevs.map((rev) => {
              return <RecipeReviewScreen recipeRev={rev} key={rev._id} />;
          })}
        </div>
      </>
    );
}

export default AllRecipeReviewScreen;