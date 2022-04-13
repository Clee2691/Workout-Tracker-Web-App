import { GET_MEAL_REVIEWS, CREATE_MEAL_REVIEW, DELETE_MEAL_REVIEW } from "../actions/recipe-review-actions";

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
            return state.filter(rev => rev._id !== action.reviewId)

        default:
            return state;
    }
}

export default reviewReducer;