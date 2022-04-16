import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const CLIENTNUTRITIONAPI = `${API_BASE}/client-nutrition`;

const api = axios.create({
  withCredentials: true,
});

export const findClientNutrition = async (clientId) => {
  const response = await api.get(`${CLIENTNUTRITIONAPI}/client/${clientId}`);
  return response.data;
};

export const findNutritionClients = async (nutritionistId) => {
  const response = await api.get(
    `${CLIENTNUTRITIONAPI}/nutritionist/${nutritionistId}`
  );
  return response.data;
};

export const createRelation = async (relation) => {
  const response = await api.post(`${CLIENTNUTRITIONAPI}`, relation);
  return response.data;
};

export const deleteRelation = async (relationId) => {
  const response = await api.delete(`${CLIENTNUTRITIONAPI}/${relationId}`);
  return response.data;
};

export const findExistingRelation = async (clientId, nutritionistId) => {
    const response = await api.get(
      `${CLIENTNUTRITIONAPI}/${clientId}/${nutritionistId}`
    );
    return response.data;
}