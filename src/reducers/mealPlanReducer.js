import {
  GET_ALL_MEAL_PLANS,
  GET_NUTRITIONIST_PLANS,
  CREATE_MEAL_PLAN,
  DELETE_MEAL_PLAN,
} from "../actions/mealPlan-actions.js";

const mealPlanReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_MEAL_PLAN:
      const newMealPlans = [...state, action.insertedMealPlan];
      return newMealPlans;

    case GET_NUTRITIONIST_PLANS:
      return action.nutritionistPlans;

    case GET_ALL_MEAL_PLANS:
      return action.allMealPlans;

    case DELETE_MEAL_PLAN:
      return state.filter((mealPlan) => mealPlan._id !== action.mealPlanId);

    default:
      return state;
  }
};

export default mealPlanReducer;
