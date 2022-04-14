import * as service from "../service/recipe-review-service";

export const GET_MEAL_REVIEWS = "GET_MEAL_REVIEWS";
export const CREATE_MEAL_REVIEW = "CREATE_MEAL_REVIEW";
export const DELETE_MEAL_REVIEW = "DELETE_MEAL_REVIEW";
export const GET_RECENT_REVIEWS = "GET_RECENT_REVIEWS";
export const GET_USER_RECIPE_REVIEWS = "GET_USER_RECIPE_REVIEWS";

export const GetRecentReviews = async (dispatch) => {
    const recentReviews = await service.findRecentReviews();
    dispatch({
        type:GET_RECENT_REVIEWS,
        recentReviews
    })
}

export const GetMealReviews = async (dispatch, mealId) => {
  const allReviews = await service.findRevByMealId(mealId);
  dispatch({
    type: GET_MEAL_REVIEWS,
    allReviews,
  });
};

export const CreateMealReview = async (dispatch, newReview) => {
  const theReview = { ...newReview, revDate: new Date() };
  const insertedReview = await service.createReview(theReview);
  dispatch({
    type: CREATE_MEAL_REVIEW,
    insertedReview,
  });
};

export const DeleteMealReview = async (dispatch, reviewId) => {
    await service.deleteReview(reviewId);
    dispatch({
        type: DELETE_MEAL_REVIEW,
        reviewId
    })
}

export const GetRecipeRevsByUId = async(dispatch, uId) => {
    const userReviews = await service.findRevByUId(uId);
    dispatch({
        type: GET_USER_RECIPE_REVIEWS,
        userReviews
    })
}