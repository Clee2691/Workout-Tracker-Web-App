import {
  GET_MEAL_REVIEWS,
  CREATE_MEAL_REVIEW,
  DELETE_MEAL_REVIEW,
  GET_RECENT_REVIEWS,
  GET_USER_RECIPE_REVIEWS,
  GET_ALL_REVIEWS
} from "../actions/recipe-review-actions";

const reviewReducer = (state = [], action) => {
    switch(action.type) {
        case GET_MEAL_REVIEWS:
            return action.allReviews;

        case CREATE_MEAL_REVIEW:
            const reviews = [
                ...state,
                action.insertedReview
            ]
            return reviews;

        case DELETE_MEAL_REVIEW:
            return state.filter(rev => rev._id !== action.reviewId);
        
        case GET_RECENT_REVIEWS:
            return action.recentReviews; 
        
        case GET_USER_RECIPE_REVIEWS:
            return action.userReviews;

        case GET_ALL_REVIEWS:
            return action.allReviews;

        default:
            return state;
    }
}

export default reviewReducer;