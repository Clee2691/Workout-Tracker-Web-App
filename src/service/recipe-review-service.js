import axios from "axios";
//const TUITS_API = 'http://localhost:4000/api';
const API_BASE = process.env.REACT_APP_API_BASE;
const REVAPI = `${API_BASE}/recipe`;

const api = axios.create({
  withCredentials: true,
});

export const findRecentReviews = async () => {
    const response = await api.get(`${REVAPI}/review/recent`);
    return response.data;
}

// Find review by meal Id
export const findRevByMealId = async (mealId) => {
  const response = await api.get(`${REVAPI}/review/${mealId}`);
  return response.data;
};

export const createReview = async (newReview) => {
    const response = await api.post(`${REVAPI}/review`, newReview);
    return response.data;
}

export const deleteReview = async (revId) => {
    const status = await api.delete(`${REVAPI}/review/${revId}`);
    return status;
}

export const findRevByUId = async(uId) => {
    const response = await api.get(`${REVAPI}/review/${uId}`);
    return response.data;
}