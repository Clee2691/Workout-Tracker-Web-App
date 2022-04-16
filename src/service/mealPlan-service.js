import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const MEALPLANAPI = `${API_BASE}/mealplans`;

const api = axios.create({
  withCredentials: true,
});

export const findAllMealPlans = async () => {
  const response = await api.get(`${MEALPLANAPI}`);
  return response.data;
};

export const findNutritionistMealPlans = async (uid) => {
  const response = await api.get(`${MEALPLANAPI}/nutritionist/${uid}`);
  return response.data;
};

export const createMealPlan = async (mealPlan) => {
  const response = await api.post(`${MEALPLANAPI}`, mealPlan);
  return response.data;
};

export const deleteMealPlan = async (mealPlanId) => {
  const status = await api.delete(`${MEALPLANAPI}/${mealPlanId}`);
  return status;
};
