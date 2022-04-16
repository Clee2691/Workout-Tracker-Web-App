import * as service from "../service/mealPlan-service.js";

export const GET_ALL_MEAL_PLANS = "GET_ALL_MEAL_PLANS";
export const GET_NUTRITIONIST_PLANS = "GET_NUTRITIONIST_PLANS";
export const CREATE_MEAL_PLAN = "CREATE_MEAL_PLAN";
export const DELETE_MEAL_PLAN = "DELETE_MEAL_PLAN";

export const GetAllMealPlans = async (dispatch) => {
  const allMealPlans = await service.findAllMealPlans();
  dispatch({
    type: GET_ALL_MEAL_PLANS,
    allMealPlans,
  });
};

export const GetNutriMealPlans = async (dispatch, uid) => {
  const nutritionistPlans = await service.findNutritionistMealPlans(uid);
  dispatch({
    type: GET_NUTRITIONIST_PLANS,
    nutritionistPlans,
  });
};

export const CreateMealPlan = async (dispatch, mealPlan) => {
  const insertedMealPlan = await service.createMealPlan(mealPlan);
  dispatch({
    type: CREATE_MEAL_PLAN,
    insertedMealPlan,
  });
};

export const DeleteMealPlan = async (dispatch, mealPlanId) => {
  const status = await service.deleteMealPlan(mealPlanId);
  dispatch({
    type: DELETE_MEAL_PLAN,
    mealPlanId,
  });
};
